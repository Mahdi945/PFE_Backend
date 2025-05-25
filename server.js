import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRouter from './routes/authRoute.js';
import PermissionRouter from './routes/PermissionRoute.js';
import pompeRouter from './routes/PompeRoute.js';
import pistoletRouter from './routes/PistoletRoute.js';
import creditRouter from './routes/GestionCreditRoute.js';
import notificationRouter from './routes/NotificationRoute.js';
import AffectationCalendrierRouter from './routes/AffectationCalendrierRoute.js';
import passport from './config/passport.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import cron from 'node-cron';
import Credit from './models/Credit.js';
import Notification from './models/Notification.js';
import nodemailer from 'nodemailer';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger-config.js';
import stockRouter from './routes/stockRoute.js';
import reclamationRouter from './routes/reclamationRoute.js';
import messageRouter from './routes/messageRoute.js';
//import OdooService from './services/OdooService.js';
//import odooRouter from './routes/odooRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:4200', 'https://www.getpostman.com'], // Autorise à la fois Angular
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api', authRouter);
app.use('/api', PermissionRouter);
app.use('/api/pompe', pompeRouter);
app.use('/api/pistolet', pistoletRouter);
app.use('/api/affectations', AffectationCalendrierRouter);
app.use('/api/credit', creditRouter);
app.use('/api/stock', stockRouter);
app.use('/api/Reclamation', reclamationRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/messages', messageRouter);

// Ajoutez cette ligne APRÈS les autres app.use() et AVANT les routes
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      withCredentials: true, // Essentiel pour les cookies
      persistAuthorization: true, // Garde l'authentification entre les rafraîchissements
    },
    customSiteTitle: 'API Carbotrack Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  }),
);
//app.use('/api/odoo', odooRouter);
// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public/transactions');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
// Static files
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/qrcodes', express.static(path.join(__dirname, 'public/qrcodes')));
app.use('/transactions', express.static(path.join(__dirname, 'public/transactions')));
app.use('/images_produits', express.static(path.join(__dirname, 'public/images_produits')));

// Database connection check
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connection successful');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
})();

// Vérification de la connexion Odoo
//(async () => {
//try {
//const result = await OdooService.testConnection();

//if (result.success) {
//console.log('✅ Odoo connection successful', {
//uid: result.uid,
//version: result.version.server_version,
//database: result.db
//});
//} else {
//console.error('❌ Odoo connection failed:', result.error);
// Optionnel: arrêter le serveur si Odoo est essentiel
// process.exit(1);
//}
//} catch (err) {
//console.error('❌ Odoo connection error:', err);
//}
//})();

// Fonction pour envoyer des emails de notification
const sendNotificationEmail = async (userId, subject, message) => {
  try {
    const [user] = await pool.query('SELECT email, username FROM utilisateurs WHERE id = ?', [
      userId,
    ]);

    if (user && user[0] && user[0].email) {
      const emailContent = `
        <p>Bonjour ${user[0].username},</p>
        ${message}
      `;

      await transporter.sendMail({
        from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
        to: user[0].email,
        subject: subject,
        html: emailContent,
      });
    }
  } catch (err) {
    console.error('Erreur envoi email notification:', err);
  }
};
// Nouveau CRON Job pour désactiver les comptes avec plus de 2 crédits expirés
cron.schedule('0 3 * * *', async () => {
  // Tous les jours à 3h du matin
  try {
    console.log('🔄 Vérification des comptes avec crédits expirés...');

    // 1. Trouver les utilisateurs avec plus de 2 crédits expirés
    const [usersWithExpiredCredits] = await pool.query(`
      SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.status,
        COUNT(dc.id) AS expired_credits_count
      FROM utilisateurs u
      JOIN details_credits dc ON u.id = dc.id_utilisateur
      WHERE dc.etat = 'expiré'
      AND u.role = 'client'
      AND u.status = 'active'
      GROUP BY u.id
      HAVING COUNT(dc.id) > 2
    `);

    // Récupérer l'ID du gérant
    const [gerant] = await pool.query(`
      SELECT id FROM utilisateurs 
      WHERE role = 'gerant' 
      LIMIT 1
    `);

    const gerantId = gerant[0]?.id;

    for (const user of usersWithExpiredCredits) {
      // 2. Désactiver le compte
      await pool.query(`UPDATE utilisateurs SET status = 'inactive' WHERE id = ?`, [user.id]);

      // 3. Créer une notification pour le gérant
      if (gerantId) {
        await Notification.create(
          gerantId, // ID du gérant comme destinataire
          'systeme',
          user.id, // ID du client comme entité concernée
          'compte_desactive',
          `Le compte client ${user.username} (ID: ${user.id}) a été désactivé automatiquement pour ${user.expired_credits_count} crédits expirés`,
        );
      }

      // 4. Envoyer un email au client (optionnel)
      await sendNotificationEmail(
        user.id,
        'Compte désactivé',
        `<p>Votre compte a été désactivé automatiquement car vous avez ${user.expired_credits_count} crédits expirés.</p>
         <p>Veuillez contacter le support pour plus d'informations.</p>`,
      );

      console.log(
        `Compte désactivé: ${user.username} (${user.expired_credits_count} crédits expirés)`,
      );
    }

    console.log('✅ Vérification des comptes avec crédits expirés terminée');
  } catch (err) {
    console.error('❌ Erreur lors de la vérification des comptes:', err);
  }
});
// CRON Jobs for automated notifications
cron.schedule('0 0 * * *', async () => {
  // Daily at midnight
  try {
    console.log('🔄 Running daily credit checks...');

    // 1. Process expired credits
    const [expiredCredits] = await pool.query(`
      SELECT dc.id, dc.id_utilisateur, dc.date_debut, dc.duree_credit, u.username 
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE dc.etat = 'actif'
      AND DATE_ADD(dc.date_debut, INTERVAL dc.duree_credit DAY) < CURDATE()
    `);

    for (const credit of expiredCredits) {
      // Mark as expired
      await pool.query(`UPDATE details_credits SET etat = 'expiré' WHERE id = ?`, [credit.id]);

      // Send expiration notification
      await Notification.create(
        credit.id_utilisateur,
        'credit',
        credit.id,
        'expiration',
        `Votre crédit #${credit.id} a expiré`,
      );

      // Send email
      await sendNotificationEmail(
        credit.id_utilisateur,
        'Votre crédit a expiré',
        `<p>Votre crédit #${credit.id} a expiré le ${new Date(
          new Date(credit.date_debut).getTime() + credit.duree_credit * 24 * 60 * 60 * 1000,
        ).toLocaleDateString('fr-FR')}</p>`,
      );
    }

    // 2. Credits expiring soon (3-7 days)
    const [expiringSoon] = await pool.query(`
      SELECT dc.id, dc.id_utilisateur, dc.date_debut, dc.duree_credit, u.username,
      DATEDIFF(DATE_ADD(dc.date_debut, INTERVAL dc.duree_credit DAY), CURDATE()) AS days_remaining
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE dc.etat = 'actif'
      AND DATEDIFF(DATE_ADD(dc.date_debut, INTERVAL dc.duree_credit DAY), CURDATE()) BETWEEN 3 AND 7
    `);

    for (const credit of expiringSoon) {
      await Notification.create(
        credit.id_utilisateur,
        'credit',
        credit.id,
        'expiration_proche',
        `Votre crédit #${credit.id} expire dans ${credit.days_remaining} jours`,
      );

      await sendNotificationEmail(
        credit.id_utilisateur,
        'Crédit bientôt expiré',
        `<p>Votre crédit #${credit.id} expire dans ${credit.days_remaining} jours</p>`,
      );
    }

    console.log('✅ Daily credit checks completed');
  } catch (err) {
    console.error('❌ Error in daily credit checks:', err);
  }
});

// Hourly checks
cron.schedule('0 * * * *', async () => {
  try {
    console.log('🔄 Running hourly notifications check...');

    // 1. Recently repaid credits (last hour)
    const [recentlyPaid] = await pool.query(`
      SELECT dc.id, dc.id_utilisateur, u.username 
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE dc.etat = 'remboursé'
      AND dc.date_dernier_paiement >= NOW() - INTERVAL 1 HOUR
    `);

    for (const credit of recentlyPaid) {
      await Notification.create(
        credit.id_utilisateur,
        'credit',
        credit.id,
        'remboursement',
        `Votre crédit #${credit.id} a été complètement remboursé`,
      );

      await sendNotificationEmail(
        credit.id_utilisateur,
        'Crédit remboursé',
        `<p>Votre crédit #${credit.id} a été complètement remboursé</p>`,
      );
    }

    console.log('✅ Hourly notifications check completed');
  } catch (err) {
    console.error('❌ Error in hourly notifications check:', err);
  }
});
// CRON Job pour les alertes de stock (toutes les 5 minutes)
cron.schedule('0 * * * *', async () => {
  try {
    console.log('🔄 Vérification des produits sous le seuil...');

    // 1. Récupérer les produits sous le seuil d'alerte
    const [lowStockProducts] = await pool.query(`
      SELECT 
        p.id,
        p.nom,
        p.quantite_stock,
        p.seuil_alerte,
        p.categorie_id,
        c.nom AS categorie_nom
      FROM produits p
      JOIN categories c ON p.categorie_id = c.id
      WHERE p.quantite_stock <= p.seuil_alerte
    `);

    // 2. Récupérer l'ID du gérant
    const [gerant] = await pool.query(`
      SELECT id FROM utilisateurs 
      WHERE role = 'gerant' 
      LIMIT 1
    `);

    const gerantId = gerant[0]?.id;

    if (!gerantId) {
      console.log('Aucun gérant trouvé pour envoyer les notifications');
      return;
    }

    // 3. Créer des notifications pour chaque produit sous le seuil
    for (const product of lowStockProducts) {
      const message =
        `Produit "${product.nom}" (${product.categorie_nom}) sous le seuil: ` +
        `${product.quantite_stock} restants (seuil: ${product.seuil_alerte})`;

      // Vérifier si une notification existe déjà pour ce produit
      const [existingNotification] = await pool.query(
        `
        SELECT id FROM notifications
        WHERE entity_type = 'stock' 
        AND entity_id = ?
        AND type = 'alerte_stock'
        AND vue = 0
        AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
        LIMIT 1
      `,
        [product.id],
      );

      // Si aucune notification récente n'existe, en créer une nouvelle
      if (!existingNotification || existingNotification.length === 0) {
        await Notification.create(gerantId, 'stock', product.id, 'alerte_stock', message);

        console.log(`Notification créée pour: ${product.nom}`);

        // Envoyer un email au gérant
        await sendNotificationEmail(
          gerantId,
          `Alerte stock: ${product.nom}`,
          `<p>Le produit <strong>${product.nom}</strong> (${product.categorie_nom}) est sous le seuil d'alerte.</p>
           <p>Stock actuel: ${product.quantite_stock}</p>
           <p>Seuil d'alerte: ${product.seuil_alerte}</p>`,
        );
      }
    }

    console.log('✅ Vérification des produits sous le seuil terminée');
  } catch (err) {
    console.error('❌ Erreur lors de la vérification du stock:', err);
  }
});
// Weekly summary every Monday at 9 AM
cron.schedule('0 9 * * 1', async () => {
  try {
    console.log('🔄 Running weekly summary...');

    // Get all active users
    const [users] = await pool.query(`
      SELECT id, username, email FROM utilisateurs WHERE status = 'active'
    `);

    for (const user of users) {
      // Get weekly stats - Version corrigée
      const [[{ transactions }]] = await pool.query(
        `
        SELECT COUNT(*) AS transactions 
        FROM transactions t
        JOIN details_credits dc ON t.id_credit = dc.id
        WHERE dc.id_utilisateur = ? 
        AND t.date_transaction >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      `,
        [user.id],
      );

      const [[{ payments }]] = await pool.query(
        `
        SELECT SUM(montant_paye) AS payments 
        FROM paiements_credits 
        WHERE id_utilisateur = ? 
        AND date_paiement >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      `,
        [user.id],
      );

      await Notification.create(
        user.id,
        'systeme',
        null,
        'resume_hebdo',
        `Résumé hebdomadaire: ${transactions} transactions, ${payments || 0} DT payés`,
      );

      if (user.email) {
        await transporter.sendMail({
          from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Votre résumé hebdomadaire',
          html: `
            <p>Bonjour ${user.username},</p>
            <p>Votre activité cette semaine :</p>
            <ul>
              <li>Transactions: ${transactions}</li>
              <li>Montant payé: ${payments || 0} DT</li>
            </ul>
          `,
        });
      }
    }

    console.log('✅ Weekly summary completed');
  } catch (err) {
    console.error('❌ Error in weekly summary:', err);
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
