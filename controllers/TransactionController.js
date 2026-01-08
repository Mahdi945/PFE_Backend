/**
 * Contrôleur pour la gestion des transactions
 * Gère les opérations de transaction, notifications et communications par email
 */

import Transaction from '../models/Transaction.js';
import Credit from '../models/Credit.js';
import Notification from '../models/Notification.js';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import db from '../config/db.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

/**
 * Configuration du transporteur email pour les notifications
 * Utilise Gmail avec les credentials d'environnement
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Génère un template HTML personnalisé pour les emails
 * Template responsive avec branding Carbotrack
 */
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
              box-shadow: 0 4px 15px rgba(255, 126, 51, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(255, 126, 51, 0.4)';" 
            onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 15px rgba(255, 126, 51, 0.3)';">
              ${actionText}
            </a>
          </div>
        `
            : ''
        }
      </div>
      <div style="padding: 24px; text-align: center; font-size: 14px; color: #95a5a6; background: #f9f9f9;">
        <p style="margin: 0;">
          © ${new Date().getFullYear()} Carbotrack. Tous droits réservés.
        </p>
        <p style="margin: 8px 0 0;">
          <a href="${process.env.FRONTEND_URL}" style="color: #7f8c8d; text-decoration: none; font-weight: 500;">Accéder à la plateforme</a>
        </p>
      </div>
    </div>
  `;
};

/**
 * Crée une nouvelle transaction avec gestion de crédit et notifications
 * Vérifie les soldes, traite les paiements et envoie des confirmations par email
 */
const createTransaction = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { id_vehicule, quantite, montant, id_pompiste } = req.body;
    let preuvePath = null;

    // Validation des données
    if (!id_vehicule || !quantite || !montant || !id_pompiste) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs obligatoires doivent être fournis',
      });
    }
    console.log('Données reçues pour la transaction:', req.body);
    console.log('ID Pompiste reçu:', req.body.id_pompiste);

    // Le fichier est déjà enregistré dans le dossier final par Multer
    if (req.file) {
      preuvePath = `${process.env.BASE_URL}/transactions/${req.file.filename}`;
    }

    // Vérification que l'utilisateur est bien un pompiste
    const [userCheck] = await connection.execute(
      `SELECT id, username, role FROM utilisateurs WHERE id = ?`,
      [id_pompiste]
    );

    if (!userCheck || userCheck.length === 0 || userCheck[0].role !== 'pompiste') {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(403).json({
        success: false,
        error: 'Seuls les pompistes peuvent enregistrer des transactions',
      });
    }

    const pompisteInfo = userCheck[0];
    let creditInfo = null;
    let nouveauSolde = null;
    let creditUtilise = 0;
    let id_utilisateur = null;
    let id_credit = null;

    // Récupérer les informations du véhicule et son crédit associé
    const [vehicule] = await connection.execute(
      `SELECT v.*, dc.id as credit_id, dc.id_utilisateur, dc.solde_credit, dc.credit_utilise, dc.type_credit
       FROM vehicules v
       LEFT JOIN details_credits dc ON v.id_credit = dc.id
       WHERE v.id = ?`,
      [id_vehicule]
    );

    if (!vehicule || vehicule.length === 0) {
      await connection.rollback();
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        error: 'Véhicule non trouvé',
      });
    }

    const vehiculeInfo = vehicule[0];
    id_credit = vehiculeInfo.credit_id;
    id_utilisateur = vehiculeInfo.id_utilisateur;

    // Si un crédit est associé au véhicule, vérifier sa validité
    if (id_credit) {
      creditInfo = {
        id: id_credit,
        id_utilisateur: vehiculeInfo.id_utilisateur,
        solde_credit: vehiculeInfo.solde_credit,
        credit_utilise: vehiculeInfo.credit_utilise,
        type_credit: vehiculeInfo.type_credit
      };

      creditUtilise = parseFloat(creditInfo.credit_utilise) || 0;
      const soldeCredit = parseFloat(creditInfo.solde_credit);
      nouveauSolde = soldeCredit - creditUtilise - parseFloat(montant);

      if (nouveauSolde < 0) {
        await connection.rollback();
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          error: 'Solde insuffisant',
          solde_disponible: soldeCredit - creditUtilise,
          montant_demande: montant,
        });
      }
    }

    // Récupération des informations utilisateur
    const [info] = await connection.execute(
      `SELECT 
         u.email, 
         u.username, 
         v.marque, 
         v.immatriculation,
         ${id_credit ? 'dc.solde_credit, dc.credit_utilise' : 'NULL as solde_credit, NULL as credit_utilise'}
       FROM utilisateurs u
       JOIN vehicules v ON v.id = ?
       ${id_credit ? 'JOIN details_credits dc ON dc.id = ?' : ''}
       WHERE u.id = ?`,
      id_credit ? [id_vehicule, id_credit, id_utilisateur] : [id_vehicule, id_utilisateur]
    );

    if (!info || info.length === 0) {
      await connection.rollback();
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        error: 'Informations non trouvées',
      });
    }

    const userInfo = info[0];
    console.log('Paramètres pour addTransaction:', {
      id_vehicule,
      quantite,
      montant,
      id_pompiste,
      preuve: preuvePath,
    });

    // Création de la transaction sans id_credit (déterminé via id_vehicule)
    const transactionResult = await Transaction.addTransaction(
      id_vehicule,
      quantite,
      montant,
      preuvePath,
      id_pompiste
    );

    // Mettre à jour le crédit si nécessaire
    if (id_credit) {
      await Transaction.updateCredit(id_credit, montant);
      // Recharger les infos crédit après mise à jour
      const [updatedCredit] = await connection.execute(
        'SELECT credit_utilise, solde_credit FROM details_credits WHERE id = ?',
        [id_credit]
      );
      creditUtilise = parseFloat(updatedCredit[0].credit_utilise);
    }

    // Envoi de l'email
    if (userInfo.email) {
      const emailContent = `
        <p>Bonjour ${userInfo.username},</p>
        <p>Votre transaction a été enregistrée avec succès par ${pompisteInfo.username} :</p>
        <ul>
          <li>Véhicule: ${userInfo.marque} (${userInfo.immatriculation})</li>
          <li>Quantité: ${quantite}L</li>
          <li>Montant: ${montant} DT</li>
          ${
            id_credit
              ? `
            <li>Crédit utilisé: #${id_credit}</li>
          `
              : '<li>Paiement: Direct</li>'
          }
          ${preuvePath ? `<li>Preuve: <a href="${preuvePath}">Voir la preuve</a></li>` : ''}
        </ul>
      `;

      const mailOptions = {
        from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
        to: userInfo.email,
        subject: 'Confirmation de transaction',
        html: generateEmailTemplate('Transaction enregistrée', emailContent),
        attachments: [
          {
            filename: 'logobg.png',
            path: path.join(__dirname, '../public', 'logobg.png'),
            cid: 'logo',
          },
        ],
      };

      transporter.sendMail(mailOptions).catch(err => {
        console.error('Erreur envoi email:', err);
      });
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Transaction enregistrée avec succès',
      data: {
        id: transactionResult.insertId,
        vehicule: `${userInfo.marque} (${userInfo.immatriculation})`,
        utilisateur: userInfo.username,
        quantite,
        montant,
        preuve: preuvePath,
        id_credit: id_credit || null,
        credit_utilise: id_credit ? creditUtilise : null,
        solde_restant: id_credit ? parseFloat(userInfo.solde_credit) - creditUtilise : null,
        id_pompiste: id_pompiste,
        pompiste: pompisteInfo.username,
      },
    });
  } catch (err) {
    await connection.rollback();
    console.error('Erreur création transaction:', err);

    // Clean up uploaded file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de la transaction',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  } finally {
    connection.release();
  }
};
/**
 * Récupère toutes les transactions du système
 * Retourne la liste complète avec informations détaillées
 */
const getAllTransactions = async (req, res) => {
  try {
    const [transactions] = await Transaction.getAllTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère les transactions d'un utilisateur spécifique
 * Filtre par ID utilisateur et retourne l'historique personnel
 */
const getTransactionsByUser = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [transactions] = await Transaction.getTransactionsByUser(id_utilisateur);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**
 * Calcule et retourne les statistiques de transaction
 * Agrège les données pour un utilisateur donné
 */
const getTransactionStats = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [stats] = await Transaction.getTransactionStats(id_utilisateur);
    res.json({ success: true, data: stats[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Récupère les transactions récentes d'un utilisateur
 * Retourne les dernières transactions avec limite configurable
 */
const getRecentTransactions = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const transactions = await Transaction.getRecentTransactions(id_utilisateur);
    res.json({ success: true, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Récupère les transactions par pompiste avec statistiques et filtrage par date
 * Supporte le filtrage par jour, mois, année ou période personnalisée
 */
const getTransactionsByPompiste = async (req, res) => {
  try {
    const { id_pompiste } = req.params;
    const { type, date, month, year, startDate, endDate } = req.query;

    // Validation de l'ID pompiste
    if (!id_pompiste || isNaN(id_pompiste)) {
      return res.status(400).json({
        success: false,
        error: 'ID pompiste invalide ou manquant',
      });
    }

    // Construction du filtre basé sur les paramètres de requête
    const filter = {};

    if (type) {
      filter.type = type;

      // Validation et ajout des paramètres spécifiques selon le type
      if (type === 'day' && date) {
        filter.date = date;
      } else if (type === 'month') {
        filter.month = month ? parseInt(month) : new Date().getMonth() + 1;
        filter.year = year ? parseInt(year) : new Date().getFullYear();
      } else if (type === 'year') {
        filter.year = year ? parseInt(year) : new Date().getFullYear();
      }
    }

    // Gestion des dates personnalisées
    if (startDate && endDate) {
      filter.startDate = startDate;
      filter.endDate = endDate;
    }

    // Appel de la fonction du modèle
    const result = await Transaction.getTransactionsByPompiste(parseInt(id_pompiste), filter);

    res.json({
      success: true,
      data: result,
      message: `Transactions du pompiste ${id_pompiste} récupérées avec succès`,
    });
  } catch (error) {
    console.error('Erreur dans getTransactionsByPompiste:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des transactions du pompiste',
      details: error.message,
    });
  }
};

// Export des fonctions
export default {
  createTransaction,
  getAllTransactions,
  getTransactionsByUser,
  getTransactionStats,
  getRecentTransactions,
  getTransactionsByPompiste,
};
