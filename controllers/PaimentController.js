/**
 * Contrôleur pour la gestion des paiements
 * Gère les opérations de paiement, notifications et communications par email
 */

import Paiments from '../models/Paiments.js';
import Notification from '../models/Notification.js';
import db from '../config/db.js';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

// Configuration de l'environnement
dotenv.config();

/**
 * Configuration du transporteur email pour les notifications de paiement
 * Utilise Gmail avec les credentials d'environnement
 */
// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Génère un template HTML personnalisé pour les emails de paiement
 * Template responsive avec branding Carbotrack
 */
// Fonction pour générer le template email
const generateEmailTemplate = (title, content, actionLink = null, actionText = null) => {
  return `
    <div style="font-family: 'Poppins', 'Segoe UI', sans-serif; max-width: 650px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);">
      <div style="padding: 50px 20px; text-align: center; background: linear-gradient(135deg, #FF7F33 0%, #FF5E1A 100%);">
        <img src="cid:logo" alt="Carbotrack Logo" style="height: 50px; width: auto; max-width: 100%;"/>
      </div>
      <div style="padding: 50px 40px; color: #333333; line-height: 1.6; background: #ffffff;">
        <h1 style="color: #2c3e50; margin: 0 0 30px 0; font-size: 30px; font-weight: 600; text-align: center; letter-spacing: -0.5px;">
          ${title}
        </h1>
        <div style="font-size: 16px; color: #555555;">
          ${content}
        </div>
        ${
          actionLink && actionText
            ? `
          <div style="text-align: center; margin: 50px 0 40px;">
            <a href="${actionLink}" style="
              display: inline-block;
              padding: 18px 40px;
              font-size: 17px;
              color: #ffffff;
              background: linear-gradient(135deg, #FF7F33 0%, #FF5E1A 100%);
              text-decoration: none;
              border-radius: 10px;
              font-weight: 600;
              transition: all 0.2s ease;
              box-shadow: 0 4px 15px rgba(255, 126, 51, 0.3);">
              ${actionText}
            </a>
          </div>`
            : ''
        }
      </div>
      <div style="padding: 24px; text-align: center; font-size: 14px; color: #95a5a6; background: #f9f9f9;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Carbotrack. Tous droits réservés.</p>
        <p style="margin: 8px 0 0;">
          <a href="${process.env.FRONTEND_URL}" style="color: #7f8c8d; text-decoration: none; font-weight: 500;">Accéder à la plateforme</a>
        </p>
      </div>
    </div>
  `;
};

/**
 * Crée un nouveau paiement pour un crédit
 * Traite le paiement, met à jour le crédit et envoie les notifications
 */
const createPayment = async (req, res) => {
  try {
    const { id_credit, montant_paye, mode_paiement, description, id_caissier } = req.body;

    // 1. Validation de base
    if (!id_credit || !montant_paye || !mode_paiement) {
      return res.status(400).json({
        success: false,
        error: 'Données incomplètes (id_credit, montant_paye et mode_paiement requis)',
      });
    }

    const montant = parseFloat(montant_paye);

    // 2. Création du paiement (sans id_utilisateur)
    const payment = await Paiments.create(
      id_credit,
      montant,
      mode_paiement,
      description,
      id_caissier,
    );

    // 3. Récupération des infos utilisateur pour la notification
    const [creditInfo] = await db.execute(
      `SELECT dc.id_utilisateur, u.username, u.email 
       FROM details_credits dc
       JOIN utilisateurs u ON dc.id_utilisateur = u.id
       WHERE dc.id = ?`,
      [id_credit],
    );

    if (!creditInfo.length) {
      return res.status(404).json({
        success: false,
        error: 'Informations crédit/utilisateur non trouvées',
      });
    }

    const { id_utilisateur, username, email } = creditInfo[0];
    const isFullPayment = payment.montant_restant <= 0;

    // 4. Création notification
    const notificationType = isFullPayment ? 'remboursement' : 'paiement_reussi';
    const notificationMessage = isFullPayment
      ? `Crédit #${id_credit} complètement remboursé (${montant} DT)`
      : `Paiement de ${montant} DT enregistré. Reste: ${payment.montant_restant} DT`;

    await Notification.create(
      id_utilisateur,
      'credit',
      id_credit,
      notificationType,
      notificationMessage,
    );

    // 5. Envoi email
    if (email) {
      const emailContent = `
        <p>Bonjour ${username},</p>
        <p>Votre paiement a été enregistré avec succès :</p>
        <ul>
          <li>Montant: ${montant} DT</li>
          <li>Mode: ${mode_paiement}</li>
          <li>Reste dû: ${payment.montant_restant} DT</li>
          ${description ? `<li>Description: ${description}</li>` : ''}
        </ul>
        ${isFullPayment ? '<p style="color:#27ae60;font-weight:600;">Votre crédit est entièrement remboursé!</p>' : ''}
      `;

      await transporter.sendMail({
        from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: isFullPayment ? 'Crédit remboursé' : 'Confirmation de paiement',
        html: generateEmailTemplate(
          isFullPayment ? 'Remboursement complet' : 'Paiement enregistré',
          emailContent,
        ),
        attachments: [
          {
            filename: 'logobg.png',
            path: path.join(process.cwd(), 'public', 'logobg.png'),
            cid: 'logo',
          },
        ],
      });
    }

    // 6. Réponse
    res.status(201).json({
      success: true,
      message: 'Paiement enregistré avec succès',
      data: {
        id: payment.id,
        reference: payment.reference,
        montant_paye: montant,
        montant_restant: payment.montant_restant,
        etat_credit: payment.etat,
        id_utilisateur, // Ajouté pour référence
        notification_sent: !!email,
      },
    });
  } catch (err) {
    console.error('Erreur création paiement:', err);

    const status = err.message.includes('non trouvé')
      ? 404
      : err.message.includes('dépasse')
        ? 400
        : 500;

    res.status(status).json({
      success: false,
      error: err.message.includes('dépasse')
        ? 'Le paiement dépasse le montant restant'
        : err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
};

/**
 * Récupère tous les paiements du système
 * Retourne la liste complète des paiements pour l'administration
 */
const getAllPayments = async (req, res) => {
  try {
    const payments = await Paiments.getAll();

    res.json({
      success: true,
      data: payments, // Envoyer directement le tableau
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * Récupère tous les paiements d'un crédit spécifique
 * Permet de voir l'historique des paiements pour un crédit donné
 */
const getPaymentsByCredit = async (req, res) => {
  try {
    const payments = await Paiments.getByCredit(req.params.id_credit);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * Récupère tous les paiements d'un utilisateur spécifique
 * Affiche l'historique des paiements pour un client donné
 */
const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Paiments.getByUser(req.params.id_utilisateur);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * Récupère un paiement par sa référence unique
 * Permet la recherche et vérification d'un paiement spécifique
 */
const getPaymentByReference = async (req, res) => {
  try {
    const payment = await Paiments.getByReference(req.params.reference);
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Paiement non trouvé',
      });
    }
    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * Calcule et retourne les statistiques de paiement d'un utilisateur
 * Fournit les totaux et métriques de paiement pour le tableau de bord
 */
const getPaymentStats = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [stats] = await Paiments.getPaymentStats(id_utilisateur);
    res.json({ success: true, data: stats[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Récupère les paiements récents d'un utilisateur
 * Affiche les derniers paiements pour l'historique rapide
 */
const getRecentPayments = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const payments = await Paiments.getRecentPayments(id_utilisateur);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default {
  createPayment,
  getAllPayments,
  getPaymentsByCredit,
  getPaymentsByUser,
  getPaymentByReference,
  getPaymentStats,
  getRecentPayments,
};
