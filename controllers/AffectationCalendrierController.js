import AffectationCalendrier from '../models/AffectationCalendrier.js';
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

// Fonction pour générer le template email (identique à votre exemple)
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
 * Fonction utilitaire pour envoyer des emails d'affectation aux pompistes
 * Gère les notifications d'affectation, mise à jour et planification mensuelle
 */
const sendAffectationEmail = async (pompisteId, dateOrMois, annee = null, isUpdate = false) => {
  try {
    // Récupérer les informations du pompiste
    const [pompiste] = await db.execute('SELECT username, email FROM utilisateurs WHERE id = ?', [
      pompisteId,
    ]);

    if (!pompiste.length || !pompiste[0].email) {
      console.warn(`Aucun email trouvé pour le pompiste ID: ${pompisteId}`);
      return;
    }

    const { username, email } = pompiste[0];

    // Noms des mois en français
    const moisNoms = [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ];

    if (isUpdate) {
      // CAS DE MISE À JOUR (date précise)
      const date = new Date(dateOrMois);
      const jour = date.getDate();
      const mois = moisNoms[date.getMonth()];
      const anneeAffectation = date.getFullYear();

      // Récupérer les détails de la nouvelle affectation
      const [affectation] = await db.execute(
        `SELECT 
          po.nom AS poste, 
          po.heure_debut, 
          po.heure_fin,
          p.numero_pompe
        FROM affectations a
        JOIN postes po ON a.poste_id = po.id
        JOIN pompes p ON a.pompe_id = p.id
        WHERE a.pompiste_id = ? AND a.date = ?
        LIMIT 1`,
        [pompisteId, dateOrMois]
      );

      if (!affectation.length) {
        console.warn(
          `Aucune affectation trouvée pour la mise à jour (pompiste ID: ${pompisteId}, date: ${dateOrMois})`
        );
        return;
      }

      const { poste, heure_debut, heure_fin, numero_pompe } = affectation[0];

      // Contenu email pour mise à jour
      const emailContent = `
        <p>Bonjour ${username},</p>
        <p>Votre affectation a été mise à jour :</p>
        <ul>
          <li><strong>Date:</strong> ${jour} ${mois} ${anneeAffectation}</li>
          <li><strong>Nouveau poste:</strong> ${poste}</li>
          <li><strong>Horaire:</strong> ${heure_debut} - ${heure_fin}</li>
          <li><strong>Pompe:</strong> ${numero_pompe}</li>
        </ul>
        <p>Merci de consulter la plateforme pour plus de détails.</p>
      `;

      await transporter.sendMail({
        from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Mise à jour de votre affectation',
        html: generateEmailTemplate(
          'Affectation mise à jour',
          emailContent,
          process.env.FRONTEND_URL,
          'Voir mes affectations'
        ),
        attachments: [
          {
            filename: 'logobg.png',
            path: path.join(process.cwd(), 'public', 'logobg.png'),
            cid: 'logo',
          },
        ],
      });
    } else {
      // CAS D'AFFECTATION AUTOMATIQUE (mois/année)
      const mois = parseInt(dateOrMois);
      const anneeAffectation = parseInt(annee);

      if (isNaN(mois) || isNaN(anneeAffectation) || mois < 1 || mois > 12) {
        console.error("Mois ou année invalide pour l'envoi d'email");
        return;
      }

      const nomMois = moisNoms[mois - 1];

      // Contenu email pour affectation automatique
      const emailContent = `
        <p>Bonjour ${username},</p>
        <p>Vos affectations pour ${nomMois} ${anneeAffectation} ont été planifiées.</p>
        <p>Veuillez consulter la plateforme pour voir vos affectations.</p>
      `;

      await transporter.sendMail({
        from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Vos affectations mensuelles',
        html: generateEmailTemplate(
          'Affectations planifiées',
          emailContent,
          process.env.FRONTEND_URL,
          'Consulter mes affectations'
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

    console.log(`Email envoyé avec succès à ${email}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
};

/**
 * Ajoute une affectation manuelle d'un pompiste à un poste et une pompe
 * Permet la planification ponctuelle d'affectations spécifiques
 */
const addAffectationManuelle = async (req, res) => {
  try {
    const { pompiste_id, poste_id, pompe_id, date } = req.body;
    await AffectationCalendrier.addAffectationManuelle(pompiste_id, poste_id, pompe_id, date);

    // Envoyer l'email au pompiste
    await sendAffectationEmail(pompiste_id, date);

    res.status(201).send({ message: 'Affectation manuelle ajoutée avec succès.' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erreur lors de l'ajout de l'affectation manuelle." });
  }
};

/**
 * Génère automatiquement les affectations équitables pour un mois
 * Distribue équitablement les pompistes sur tous les postes du mois
 */
const addAffectationAutomatiqueEquitable = async (req, res) => {
  try {
    const { mois, annee } = req.body;
    if (!mois || !annee) {
      return res.status(400).send({ message: 'Mois et année sont requis.' });
    }

    const result = await AffectationCalendrier.addAffectationAutomatiqueEquitable(mois, annee);

    // Envoyer des emails à tous les pompistes affectés (version mensuelle)
    const [affectedPompistes] = await db.execute(
      `SELECT DISTINCT pompiste_id FROM affectations 
       WHERE MONTH(date) = ? AND YEAR(date) = ?`,
      [mois, annee]
    );

    for (const { pompiste_id } of affectedPompistes) {
      await sendAffectationEmail(pompiste_id, mois, annee); // Mois et année pour affectation automatique
    }

    res.status(201).send({
      message: 'Affectation automatique équitable ajoutée avec succès.',
      stats: result.stats,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erreur lors de l'ajout de l'affectation automatique équitable.",
    });
  }
};

/**
 * Régénère toutes les affectations pour un mois donné
 * Supprime les affectations existantes et les recalcule équitablement
 */
const regenerateAffectations = async (req, res) => {
  try {
    const { mois, annee } = req.body;

    if (!mois || !annee) {
      return res.status(400).send({ message: 'Mois et année sont requis.' });
    }

    const result = await AffectationCalendrier.addAffectationAutomatiqueEquitable(
      mois,
      annee,
      true
    );

    // Envoyer des emails à tous les pompistes affectés
    const [affectedPompistes] = await db.execute(
      `SELECT DISTINCT pompiste_id, date FROM affectations 
       WHERE MONTH(date) = ? AND YEAR(date) = ?`,
      [mois, annee]
    );

    for (const { pompiste_id, date } of affectedPompistes) {
      await sendAffectationEmail(pompiste_id, date, true); // isUpdate = true
    }

    res.status(201).send({
      message: 'Affectations régénérées avec succès.',
      stats: result.stats,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erreur lors de la régénération des affectations.' });
  }
};
/**
 * Met à jour une affectation existante
 * Permet la modification du pompiste, poste, pompe ou date
 */
const updateAffectation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).send({ message: "L'ID est requis." });
    }

    if (!updates.pompiste && !updates.poste && !updates.numero_pompe && !updates.date) {
      return res.status(400).send({ message: 'Au moins un champ doit être fourni.' });
    }

    // Récupérer l'ancienne affectation pour avoir le pompiste_id et la date
    const [oldAffectation] = await db.execute(
      'SELECT pompiste_id, date FROM affectations WHERE id = ?',
      [id]
    );

    const result = await AffectationCalendrier.updateAffectation(id, updates);

    // Si la date ou le pompiste a changé, envoyer un email
    if (oldAffectation.length > 0) {
      const pompisteId = updates.pompiste_id || oldAffectation[0].pompiste_id;
      const date = updates.date || oldAffectation[0].date;

      await sendAffectationEmail(pompisteId, date, null, true); // Date et isUpdate=true
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erreur lors de la mise à jour.' });
  }
};

/**
 * Récupère toutes les affectations pour une date spécifique
 * Retourne la liste des pompistes affectés pour un jour donné
 */
const getAffectationsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const affectations = await AffectationCalendrier.getAffectationsByDate(date);
    res.status(200).send(affectations);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erreur lors de la récupération des affectations.' });
  }
};

/**
 * Récupère toutes les affectations pour un mois et une année
 * Permet la visualisation du planning mensuel complet
 */
const getAffectationsByMonthYear = async (req, res) => {
  try {
    const { mois, annee } = req.params;
    const affectations = await AffectationCalendrier.getAffectationsByMonthYear(mois, annee);
    res.status(200).send(affectations);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erreur lors de la récupération des affectations.' });
  }
};

/**
 * Récupère l'affectation actuelle d'un pompiste
 * Vérifie si le pompiste est actuellement en service
 */
const getCurrentAffectation = async (req, res) => {
  try {
    const { pompiste_id } = req.params;
    const affectation = await AffectationCalendrier.getCurrentAffectation(pompiste_id);

    if (!affectation) {
      return res.status(404).json({
        success: false,
        message: 'Aucune affectation trouvée pour ce pompiste à ce créneau horaire',
      });
    }

    res.status(200).json({
      success: true,
      data: affectation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message,
    });
  }
};

/**
 * Récupère les pistolets disponibles pour une affectation
 * Liste les pistolets de la pompe assignée au pompiste
 */
const getAvailablePistolets = async (req, res) => {
  try {
    const { affectation_id } = req.params;
    const pistolets =
      await AffectationCalendrier.getAvailablePistoletsByAffectation(affectation_id);

    res.status(200).json({
      success: true,
      data: pistolets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message,
    });
  }
};

export default {
  addAffectationManuelle,
  addAffectationAutomatiqueEquitable,
  getAffectationsByDate,
  getAffectationsByMonthYear,
  updateAffectation,
  regenerateAffectations,
  getCurrentAffectation,
  getAvailablePistolets,
};
