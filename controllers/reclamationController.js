import Reclamation from '../models/reclamationModel.js';
import Notification from '../models/Notification.js';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateEmailTemplate = (title, content, actionLink = null, actionText = null) => {
  return `
    <div style="font-family: 'Poppins', 'Segoe UI', sans-serif; max-width: 650px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);">
      <div style="padding: 50px 20px; text-align: center; background: linear-gradient(135deg, #FF7F33 0%, #FF5E1A 100%);">
        <img src="cid:logo" alt="Logo" style="height: 50px; width: auto; max-width: 100%;"/>
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
          </div>
        `
            : ''
        }
      </div>
      
      <div style="padding: 24px; text-align: center; font-size: 14px; color: #95a5a6; background: #f9f9f9;">
        <p style="margin: 0;">
          © ${new Date().getFullYear()} StationService. Tous droits réservés.
        </p>
        <p style="margin: 8px 0 0;">
          <a href="${process.env.FRONTEND_URL}" style="color: #7f8c8d; text-decoration: none; font-weight: 500;">Accéder à la plateforme</a>
        </p>
      </div>
    </div>
  `;
};

const sendEmail = async (to, subject, title, content, includeAction = false) => {
  const mailOptions = {
    from: `"Service Réclamations" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: generateEmailTemplate(
      title,
      content,
      includeAction ? `${process.env.FRONTEND_URL}/traitement-reclamations` : null,
      includeAction ? 'Accéder aux réclamations' : null
    ),
    attachments: [
      {
        filename: 'logobg.png',
        path: path.join(__dirname, '../public/logobg.png'),
        cid: 'logo',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé à:', to);
  } catch (error) {
    console.error('Erreur envoi email:', error);
  }
};

const createNotification = async (userId, reclamationId, type, message) => {
  try {
    await Notification.create(userId, 'reclamation', reclamationId, type, message);
    console.log('Notification créée avec succès');
  } catch (error) {
    console.error('Erreur création notification:', error);
  }
};

export const createReclamation = async (req, res) => {
  try {
    const { id_client, objet, raison, description } = req.body;

    const reclamationId = await Reclamation.create({ id_client, objet, raison, description });
    const reclamation = await Reclamation.findById(reclamationId);

    if (!reclamation) {
      throw new Error('Réclamation non trouvée après création');
    }

    // Création de la notification
    await createNotification(
      id_client,
      reclamationId,
      'reclamation_created',
      `Votre réclamation #${reclamation.reference} a été créée avec succès`
    );

    // Email au support
    const supportContent = `
      <div style="margin-bottom: 30px;">
        <p>Une nouvelle réclamation a été soumise par <strong>${reclamation.username}</strong> (${reclamation.email}).</p>
        
        <div style="background: #FFF8F5; border: 1px solid #FFE8DE; padding: 20px; border-radius: 10px; margin-top: 20px;">
          <p style="font-weight: 600; margin-bottom: 15px;">Détails de la réclamation :</p>
          <p><strong>Référence :</strong> ${reclamation.reference}</p>
          <p><strong>Objet :</strong> ${reclamation.objet}</p>
          <p><strong>Raison :</strong> ${reclamation.raison}</p>
          <p><strong>Description :</strong></p>
          <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 5px;">
            ${reclamation.description}
          </div>
          <p style="margin-top: 15px;"><strong>Date :</strong> ${new Date(reclamation.date_creation).toLocaleString()}</p>
        </div>
      </div>
    `;

    await sendEmail(
      process.env.SUPPORT_EMAIL,
      `Nouvelle réclamation - ${reclamation.reference}`,
      'Nouvelle réclamation',
      supportContent,
      true
    );

    // Email de confirmation au client
    const clientContent = `
      <div style="margin-bottom: 30px;">
        <p>Bonjour ${reclamation.username},</p>
        <p>Nous avons bien reçu votre réclamation et nous la traiterons dans les plus brefs délais.</p>
        
        <div style="background: #FFF8F5; border: 1px solid #FFE8DE; padding: 20px; border-radius: 10px; margin-top: 20px;">
          <p style="font-weight: 600; margin-bottom: 15px;">Détails de votre réclamation :</p>
          <p><strong>Référence :</strong> ${reclamation.reference}</p>
          <p><strong>Objet :</strong> ${reclamation.objet}</p>
          <p><strong>Raison :</strong> ${reclamation.raison}</p>
          <p><strong>Date :</strong> ${new Date(reclamation.date_creation).toLocaleString()}</p>
          <p><strong>Statut :</strong> En attente de traitement</p>
        </div>
        
        <p style="margin-top: 20px;">
          Vous serez informé par email dès que votre réclamation sera traitée.
        </p>
      </div>
    `;

    await sendEmail(
      reclamation.email,
      `Confirmation de réception - ${reclamation.reference}`,
      'Votre réclamation a été reçue',
      clientContent
    );

    res.status(201).json({
      success: true,
      message: 'Réclamation enregistrée avec succès',
      reclamation: {
        id: reclamationId,
        reference: reclamation.reference,
        date_creation: reclamation.date_creation,
      },
    });
  } catch (err) {
    console.error('Erreur création réclamation:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la réclamation',
      error: err.message,
    });
  }
};

export const updateReclamationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    // Vérifier l'état actuel de la réclamation
    const currentReclamation = await Reclamation.findById(id);
    if (!currentReclamation) {
      return res.status(404).json({
        success: false,
        message: 'Réclamation non trouvée',
      });
    }

    // Empêcher la modification si le statut est déjà résolu ou fermé
    if (['fermer'].includes(currentReclamation.statut)) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de modifier une réclamation déjà résolue ou fermée',
      });
    }

    // Mettre à jour le statut
    const reclamation = await Reclamation.updateStatut(id, statut);

    // Créer une notification pour le client
    let notificationType = '';
    let notificationMessage = '';
    let emailSubject = '';
    let emailTitle = '';
    let emailContent = '';

    if (statut === 'resolu') {
      notificationType = 'reclamation_resolved';
      notificationMessage = `Votre réclamation #${reclamation.reference} a été marquée comme résolue`;
      emailSubject = `Réclamation résolue - ${reclamation.reference}`;
      emailTitle = 'Réclamation résolue';
      emailContent = `
        <div style="margin-bottom: 30px;">
          <p>Bonjour ${reclamation.username},</p>
          <p>Nous vous informons que votre réclamation a été marquée comme résolue.</p>
          
          <div style="background: #FFF8F5; border: 1px solid #FFE8DE; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <p style="font-weight: 600; margin-bottom: 15px;">Détails :</p>
            <p><strong>Référence :</strong> ${reclamation.reference}</p>
            <p><strong>Objet :</strong> ${reclamation.objet}</p>
            <p><strong>Date de résolution :</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="margin-top: 20px;">
            Si vous avez d'autres questions, n'hésitez pas à répondre à cet email.
          </p>
        </div>
      `;
    } else if (statut === 'fermer') {
      notificationType = 'reclamation_closed';
      notificationMessage = `Votre réclamation #${reclamation.reference} a été fermée`;
      emailSubject = `Réclamation fermée - ${reclamation.reference}`;
      emailTitle = 'Réclamation fermée';
      emailContent = `
        <div style="margin-bottom: 30px;">
          <p>Bonjour ${reclamation.username},</p>
          <p>Nous vous informons que votre réclamation a été fermée.</p>
          
          <div style="background: #FFF8F5; border: 1px solid #FFE8DE; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <p style="font-weight: 600; margin-bottom: 15px;">Détails :</p>
            <p><strong>Référence :</strong> ${reclamation.reference}</p>
            <p><strong>Objet :</strong> ${reclamation.objet}</p>
            <p><strong>Date de fermeture :</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;
    } else {
      notificationType = 'reclamation_updated';
      notificationMessage = `Le statut de votre réclamation #${reclamation.reference} a été mis à jour: ${statut}`;
    }

    // Créer la notification
    await createNotification(reclamation.id_client, id, notificationType, notificationMessage);

    // Envoyer l'email si le statut est résolu ou fermé
    if (['resolu', 'fermer'].includes(statut)) {
      await sendEmail(reclamation.email, emailSubject, emailTitle, emailContent);
    }

    res.status(200).json({
      success: true,
      message: 'Statut mis à jour avec succès',
      reclamation,
    });
  } catch (err) {
    console.error('Erreur mise à jour statut:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du statut',
      error: err.message,
    });
  }
};

export const getClientReclamations = async (req, res) => {
  try {
    const { id_client } = req.params;
    const reclamations = await Reclamation.findByClient(id_client);
    res.status(200).json({ success: true, reclamations });
  } catch (err) {
    console.error('Erreur récupération réclamations:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

export const getReclamationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const reclamation = await Reclamation.findById(id);

    if (!reclamation) {
      return res.status(404).json({ success: false, message: 'Réclamation non trouvée' });
    }

    res.status(200).json({ success: true, reclamation });
  } catch (err) {
    console.error('Erreur récupération réclamation:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

export const getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.getAll();
    res.status(200).json({ success: true, reclamations });
  } catch (err) {
    console.error('Erreur récupération réclamations:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

export const getReclamationByReference = async (req, res) => {
  try {
    const { reference } = req.params;
    const reclamation = await Reclamation.getByReference(reference);

    if (!reclamation) {
      return res.status(404).json({ success: false, message: 'Réclamation non trouvée' });
    }

    res.status(200).json({ success: true, reclamation });
  } catch (err) {
    console.error('Erreur récupération réclamation:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
