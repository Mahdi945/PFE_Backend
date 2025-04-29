import Paiments from '../models/Paiments.js';
import Notification from '../models/Notification.js';
import db from '../config/db.js';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

// Configuration de l'environnement
dotenv.config();

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
        ${actionLink && actionText ? `
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
          </div>` : ''}
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

const createPayment = async (req, res) => {
  let connection;
  try {
    const { id_credit, montant_paye, mode_paiement, description } = req.body;

    // 1. Validation de base
    if (!id_credit || !montant_paye || !mode_paiement) {
      return res.status(400).json({ 
        success: false,
        error: 'Données incomplètes (id_credit, montant_paye et mode_paiement requis)' 
      });
    }

    const montant = parseFloat(montant_paye);
    if (isNaN(montant) || montant <= 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Montant invalide (doit être un nombre positif)' 
      });
    }

    // 2. Récupération du crédit et utilisateur
    const [creditRows] = await db.execute(
      `SELECT dc.*, u.email, u.username 
       FROM details_credits dc
       JOIN utilisateurs u ON dc.id_utilisateur = u.id
       WHERE dc.id = ?`,
      [id_credit]
    );

    if (!creditRows.length) {
      return res.status(404).json({ 
        success: false,
        error: 'Crédit non trouvé' 
      });
    }

    const credit = creditRows[0];
    const id_utilisateur = credit.id_utilisateur;

    // 3. Vérification état du crédit
    if (credit.etat !== 'actif') {
      return res.status(400).json({ 
        success: false,
        error: `Le crédit n'est plus payable (état: ${credit.etat})` 
      });
    }

    // 4. Création du paiement
    const payment = await Paiments.create(
      id_credit,
      id_utilisateur,
      montant,
      mode_paiement,
      description
    );

    // 5. Création notification - CORRIGÉ selon votre structure de table
    const isFullPayment = payment.montant_restant <= 0;
    const notificationType = isFullPayment ? 'remboursement' : 'paiement_reussi';
    const notificationMessage = isFullPayment
      ? `Crédit #${id_credit} complètement remboursé (${montant} DT)`
      : `Paiement de ${montant} DT enregistré. Reste: ${payment.montant_restant} DT`;

    await Notification.create(
      id_utilisateur,
      'credit', // entity_type
      id_credit, // entity_id
      notificationType, // type
      notificationMessage // message
    );

    // 6. Envoi email
    if (credit.email) {
      const emailContent = `
        <p>Bonjour ${credit.username},</p>
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
        to: credit.email,
        subject: isFullPayment ? 'Crédit remboursé' : 'Confirmation de paiement',
        html: generateEmailTemplate(
          isFullPayment ? 'Remboursement complet' : 'Paiement enregistré', 
          emailContent
        ),
        attachments: [{
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo'
        }]
      });
    }

    // 7. Réponse
    res.status(201).json({
      success: true,
      message: 'Paiement enregistré avec succès',
      data: {
        id: payment.id,
        reference: payment.reference,
        montant_paye: montant,
        montant_restant: payment.montant_restant,
        etat_credit: payment.etat,
        notification_sent: !!credit.email
      }
    });

  } catch (err) {
    console.error('Erreur création paiement:', err);
    
    const status = err.message.includes('non trouvé') ? 404 
                 : err.message.includes('dépasse') ? 400 
                 : 500;

    res.status(status).json({
      success: false,
      error: err.message.includes('dépasse') 
        ? 'Le paiement dépasse le montant restant' 
        : err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};
const getAllPayments = async (req, res) => {
    try {
        const payments = await Paiments.getAll();
        
        res.json({
            success: true,
            data: payments // Envoyer directement le tableau
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const getPaymentsByCredit = async (req, res) => {
  try {
    const payments = await Paiments.getByCredit(req.params.id_credit);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Paiments.getByUser(req.params.id_utilisateur);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

const getPaymentByReference = async (req, res) => {
  try {
    const payment = await Paiments.getByReference(req.params.reference);
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        error: 'Paiement non trouvé' 
      });
    }
    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};
const getPaymentStats = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [stats] = await Paiments.getPaymentStats(id_utilisateur);
    res.json({ success: true, data: stats[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

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
  getRecentPayments
};