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
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api', authRouter);
app.use('/api', PermissionRouter);
app.use('/api/pompe', pompeRouter);
app.use('/api/pistolet', pistoletRouter);
app.use('/api/affectations', AffectationCalendrierRouter);
app.use('/api/credit', creditRouter);
app.use('/api/notifications', notificationRouter);

// Static files
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/qrcodes', express.static(path.join(__dirname, 'public/qrcodes')));

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

// Fonction pour envoyer des emails de notification
const sendNotificationEmail = async (userId, subject, message) => {
  try {
    const [user] = await pool.query(
      'SELECT email, username FROM utilisateurs WHERE id = ?', 
      [userId]
    );
    
    if (user && user[0] && user[0].email) {
      const emailContent = `
        <p>Bonjour ${user[0].username},</p>
        ${message}
      `;

      await transporter.sendMail({
        from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
        to: user[0].email,
        subject: subject,
        html: emailContent
      });
    }
  } catch (err) {
    console.error('Erreur envoi email notification:', err);
  }
};

// CRON Jobs for automated notifications
cron.schedule('0 0 * * *', async () => { // Daily at midnight
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
      await pool.query(
        `UPDATE details_credits SET etat = 'expiré' WHERE id = ?`,
        [credit.id]
      );
      
      // Send expiration notification
      await Notification.create(
        credit.id_utilisateur,
        'credit',
        credit.id,
        'expiration',
        `Votre crédit #${credit.id} a expiré`
      );

      // Send email
      await sendNotificationEmail(
        credit.id_utilisateur,
        'Votre crédit a expiré',
        `<p>Votre crédit #${credit.id} a expiré le ${new Date(
          new Date(credit.date_debut).getTime() + 
          credit.duree_credit * 24 * 60 * 60 * 1000
        ).toLocaleDateString('fr-FR')}</p>`
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
        `Votre crédit #${credit.id} expire dans ${credit.days_remaining} jours`
      );

      await sendNotificationEmail(
        credit.id_utilisateur,
        'Crédit bientôt expiré',
        `<p>Votre crédit #${credit.id} expire dans ${credit.days_remaining} jours</p>`
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
        `Votre crédit #${credit.id} a été complètement remboursé`
      );

      await sendNotificationEmail(
        credit.id_utilisateur,
        'Crédit remboursé',
        `<p>Votre crédit #${credit.id} a été complètement remboursé</p>`
      );
    }

    console.log('✅ Hourly notifications check completed');
  } catch (err) {
    console.error('❌ Error in hourly notifications check:', err);
  }
});

// Weekly summary every Monday at 9 AM
cron.schedule('0 9 * * 1', async () => {
  try {
    console.log('🔄 Running weekly summary...');
    
    // Get all active users
    const [users] = await pool.query(`
      SELECT id, username, email FROM utilisateurs WHERE actif = 1
    `);
    
    for (const user of users) {
      // Get weekly stats
      const [[{ transactions }]] = await pool.query(`
        SELECT COUNT(*) AS transactions 
        FROM transactions 
        WHERE id_utilisateur = ? 
        AND date_transaction >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      `, [user.id]);
      
      const [[{ payments }]] = await pool.query(`
        SELECT SUM(montant_paye) AS payments 
        FROM paiements_credits 
        WHERE id_utilisateur = ? 
        AND date_paiement >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      `, [user.id]);
      
      await Notification.create(
        user.id,
        'systeme',
        null,
        'resume_hebdo',
        `Résumé hebdomadaire: ${transactions} transactions, ${payments || 0} DT payés`
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
          `
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