import Transaction from '../models/Transaction.js';
import Credit from '../models/Credit.js';
import Notification from '../models/Notification.js';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import db from '../config/db.js';
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

// Fonction pour générer un template email avec le logo
const generateEmailTemplate = (title, content, actionLink = null, actionText = null) => {
  return `
    <div style="font-family: 'Poppins', 'Segoe UI', sans-serif; max-width: 650px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);">
      <!-- Header orange vif avec logo très grand -->
      <div style="padding: 50px 20px; text-align: center; background: linear-gradient(135deg, #FF7F33 0%, #FF5E1A 100%);">
        <img src="cid:logo" alt="Carbotrack Logo" style="height: 50px; width: auto; max-width: 100%;"/>
      </div>
      
      <!-- Contenu principal -->
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
              box-shadow: 0 4px 15px rgba(255, 126, 51, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(255, 126, 51, 0.4)';" 
            onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 15px rgba(255, 126, 51, 0.3)';">
              ${actionText}
            </a>
          </div>
        ` : ''}
      </div>
      
      <!-- Footer léger -->
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
const createTransaction = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    
    const { id_vehicule, id_utilisateur, quantite, montant, id_credit } = req.body;

    // Validation des données
    if (!id_vehicule || !id_utilisateur || !quantite || !montant) {
      return res.status(400).json({ 
        success: false,
        error: 'Tous les champs obligatoires doivent être fournis' 
      });
    }

    let creditInfo = null;
    let nouveauSolde = null;
    let creditUtilise = 0;

    // Si un crédit est spécifié, vérifier sa validité
    if (id_credit) {
      const [credit] = await connection.execute(
        `SELECT dc.* 
         FROM details_credits dc
         WHERE dc.id = ? AND dc.id_utilisateur = ?`,
        [id_credit, id_utilisateur]
      );
      
      if (!credit || credit.length === 0) {
        await connection.rollback();
        return res.status(404).json({ 
          success: false,
          error: 'Crédit non trouvé ou ne vous appartient pas' 
        });
      }
      
      creditInfo = credit[0];
      creditUtilise = parseFloat(creditInfo.credit_utilise) || 0;
      const soldeCredit = parseFloat(creditInfo.solde_credit);
      nouveauSolde = soldeCredit - creditUtilise - parseFloat(montant);
      
      if (nouveauSolde < 0) {
        await connection.rollback();
        return res.status(400).json({ 
          success: false,
          error: 'Solde insuffisant', 
          solde_disponible: soldeCredit - creditUtilise,
          montant_demande: montant
        });
      }
    }

    // Récupération des informations complètes avec jointure pour le crédit si nécessaire
    const [user] = await connection.execute(
      `SELECT 
         u.email, 
         u.username, 
         v.marque, 
         v.immatriculation,
         ${id_credit ? 'dc.solde_credit, dc.credit_utilise' : 'NULL as solde_credit, NULL as credit_utilise'}
       FROM utilisateurs u
       JOIN vehicules v ON v.id_utilisateur = u.id
       ${id_credit ? 'JOIN details_credits dc ON dc.id = ?' : ''}
       WHERE u.id = ? AND v.id = ?`,
      id_credit ? [id_credit, id_utilisateur, id_vehicule] : [id_utilisateur, id_vehicule]
    );

    if (!user || user.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        error: 'Utilisateur ou véhicule non trouvé'
      });
    }

    const userInfo = user[0];

    // Création de la transaction
    const transactionResult = await Transaction.addTransaction(
      id_vehicule, 
      id_utilisateur, 
      quantite, 
      montant, 
      id_credit || null,
      connection
    );

    // Mettre à jour le crédit si nécessaire
    if (id_credit) {
      await Transaction.updateCredit(id_credit, montant, connection);
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
    <p>Votre transaction a été enregistrée avec succès :</p>
    <ul>
      <li>Véhicule: ${userInfo.marque} (${userInfo.immatriculation})</li>
      <li>Quantité: ${quantite}L</li>
      <li>Montant: ${montant} DT</li>
      ${id_credit ? `
        <li>Crédit utilisé: #${id_credit}</li>
        <li>Crédit consommé: ${(parseFloat(creditUtilise) + parseFloat(montant)).toFixed(2)} DT</li>
        <li>Solde restant: ${(parseFloat(userInfo.solde_credit) - (parseFloat(creditUtilise) + parseFloat(montant))).toFixed(2)} DT</li>
      ` : '<li>Paiement: Direct</li>'}
    </ul>
    <p>Date: ${new Date().toLocaleString()}</p>
  `;
      const mailOptions = {
        from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
        to: userInfo.email,
        subject: 'Confirmation de transaction',
        html: generateEmailTemplate('Transaction enregistrée', emailContent),
        attachments: [{
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo'
        }]
      };

      // Envoi asynchrone pour ne pas bloquer
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
        id_credit: id_credit || null,
        credit_utilise: id_credit ? creditUtilise : null,
        solde_restant: id_credit ? (parseFloat(userInfo.solde_credit) - creditUtilise) : null,
        email_sent: !!userInfo.email
      }
    });

  } catch (err) {
    await connection.rollback();
    console.error('Erreur création transaction:', err);
    
    const status = err.message.includes('non trouvé') ? 404 : 500;
    const errorMessage = status === 404 ? err.message : 'Erreur lors de la création de la transaction';

    res.status(status).json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        message: err.message,
        stack: err.stack
      } : undefined
    });
  } finally {
    connection.release();
  }
};
  const getAllTransactions = async (req, res) => {
    try {
      const [transactions] = await Transaction.getAllTransactions();
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const getTransactionsByUser = async (req, res) => {
    try {
      const { id_utilisateur } = req.params;
      const [transactions] = await Transaction.getTransactionsByUser(id_utilisateur);
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getTransactionStats = async (req, res) => {
    try {
      const { id_utilisateur } = req.params;
      const [stats] = await Transaction.getTransactionStats(id_utilisateur);
      res.json({ success: true, data: stats[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
  const getRecentTransactions = async (req, res) => {
    try {
      const { id_utilisateur } = req.params;
      const transactions = await Transaction.getRecentTransactions(id_utilisateur);
      res.json({ success: true, data: transactions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
// Export des fonctions
export default {
  createTransaction,
  getAllTransactions,
  getTransactionsByUser,
  getTransactionStats,
  getRecentTransactions
};
