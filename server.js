// Framework web et serveur HTTP
import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io'; // Communication temps réel

// ===== IMPORTS DE CONFIGURATION ET BASE DE DONNÉES =====
import pool from './config/db.js'; // Pool de connexions MySQL
import passport from './config/passport.js'; // Authentification

// ===== IMPORTS DES ROUTES =====
// Routes pour chaque module de l'application
import authRouter from './routes/authRoute.js';
import PermissionRouter from './routes/PermissionRoute.js';
import pompeRouter from './routes/PompeRoute.js';
import pistoletRouter from './routes/PistoletRoute.js';
import creditRouter from './routes/GestionCreditRoute.js';
import notificationRouter from './routes/NotificationRoute.js';
import AffectationCalendrierRouter from './routes/AffectationCalendrierRoute.js';
import stockRouter from './routes/stockRoute.js';
import reclamationRouter from './routes/reclamationRoute.js';
import messageRouter from './routes/messageRoute.js';

// ===== IMPORTS DES MIDDLEWARES =====
import cors from 'cors'; // Cross-Origin Resource Sharing
import cookieParser from 'cookie-parser'; // Gestion des cookies

// ===== IMPORTS DES UTILITAIRES =====
import path from 'path'; // Manipulation des chemins
import fs from 'fs'; // Système de fichiers
import nodemailer from 'nodemailer'; // Envoi d'emails

// ===== IMPORTS POUR TÂCHES PLANIFIÉES =====
import cron from 'node-cron'; // Planificateur de tâches

// ===== IMPORTS DES MODÈLES =====
import Credit from './models/Credit.js';
import Notification from './models/Notification.js';

// ===== IMPORTS POUR DOCUMENTATION API =====
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger-config.js';

// ===== SERVICES EXTERNES (DÉSACTIVÉS) =====
// import OdooService from './services/OdooService.js';
// import odooRouter from './routes/odooRoute.js';

// ===== CHARGEMENT DES VARIABLES D'ENVIRONNEMENT =====
// Doit être appelé en premier pour charger les variables .env
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL || 'http://localhost:4200'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const PORT = process.env.PORT || 3000;

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ===== CONFIGURATION MIDDLEWARES =====
// Parsing JSON et URL encodés
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS pour autoriser le frontend Angular et Postman
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:4200', 'https://www.getpostman.com'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Autorise les cookies et l'authentification
  })
);

// Gestion des cookies et authentification
app.use(cookieParser());
app.use(passport.initialize());

// ===== CONFIGURATION WEBSOCKET =====
// Map pour suivre les utilisateurs connectés
const connectedUsers = new Map(); // userId -> socketId

io.on('connection', socket => {
  console.log('🔌 User connected:', socket.id);

  // ===== GESTION DE CONNEXION UTILISATEUR =====
  socket.on('join', userId => {
    connectedUsers.set(userId, socket.id);
    console.log(`👤 User ${userId} joined with socket ${socket.id}`);
  });

  // ===== GESTION DES MESSAGES EN TEMPS RÉEL =====
  socket.on('sendMessage', async data => {
    try {
      const { senderId, receiverId, content } = data;

      // Sauvegarder le message en base de données
      const Message = (await import('./models/Message.js')).default;
      const messageId = await Message.create(senderId, receiverId, content);

      // Récupérer les données complètes du message avec info utilisateurs
      const [messageData] = await pool.execute(
        `
        SELECT m.*, u1.username as sender_name, u1.photo as sender_photo, 
               u2.username as receiver_name, u2.photo as receiver_photo
        FROM messages m
        JOIN utilisateurs u1 ON m.sender_id = u1.id
        JOIN utilisateurs u2 ON m.receiver_id = u2.id
        WHERE m.id = ?
      `,
        [messageId]
      );

      const fullMessage = messageData[0];

      // Envoyer au destinataire s'il est en ligne
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', fullMessage);
        console.log(`📨 Message sent to receiver ${receiverId} (socket: ${receiverSocketId})`);
      } else {
        console.log(`📨 Receiver ${receiverId} is offline`);
      }

      // Confirmation à l'expéditeur
      socket.emit('messageConfirmed', fullMessage);
      console.log(`✅ Message confirmed to sender ${senderId}`);

      // Mise à jour du compteur de messages non lus
      const receiverUnreadCount = await Message.getUnreadCount(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('unreadCountUpdate', {
          userId: receiverId,
          count: receiverUnreadCount,
        });
      }

      console.log(`📨 Message sent via WebSocket: ${senderId} -> ${receiverId}`);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('messageError', { error: error.message });
    }
  });

  // ===== MARQUER LES MESSAGES COMME LUS =====
  socket.on('markAsRead', async data => {
    try {
      const { senderId, receiverId } = data;
      const Message = (await import('./models/Message.js')).default;

      await Message.markAsRead(senderId, receiverId);

      // Mettre à jour le compteur pour le destinataire
      const unreadCount = await Message.getUnreadCount(receiverId);
      socket.emit('unreadCountUpdate', { count: unreadCount });
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  });

  // ===== GESTION DE DÉCONNEXION =====
  socket.on('disconnect', () => {
    // Supprimer l'utilisateur de la liste des connectés
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`👤 User ${userId} disconnected`);
        break;
      }
    }
    console.log('🔌 User disconnected:', socket.id);
  });
});

// ===== CONFIGURATION DES ROUTES =====
// Rendre WebSocket disponible pour les routes
app.set('io', io);

// Enregistrement des routes principales
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

// ===== DOCUMENTATION API SWAGGER =====
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
  })
);

// ===== CONFIGURATION DES FICHIERS STATIQUES =====
// Créer le dossier transactions s'il n'existe pas
const uploadsDir = path.join(process.cwd(), 'public/transactions');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Servir les fichiers statiques
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/qrcodes', express.static(path.join(__dirname, 'public/qrcodes')));
app.use('/transactions', express.static(path.join(__dirname, 'public/transactions')));
app.use('/images_produits', express.static(path.join(__dirname, 'public/images_produits')));

// ===== VÉRIFICATION CONNEXION BASE DE DONNÉES =====
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connection successful');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
})();

// ===== VÉRIFICATION CONNEXION ODOO (DÉSACTIVÉ) =====
// Connexion au système ERP Odoo pour intégration métier
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
//}
//} catch (err) {
//console.error('❌ Odoo connection error:', err);
//}
//})();

// ===== UTILITAIRES EMAIL =====
// Fonction pour envoyer des emails de notification aux utilisateurs
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
// ===== TÂCHES PLANIFIÉES (CRON JOBS) =====

// ===== CRON JOB 1: DÉSACTIVATION DES COMPTES AVEC TROP DE CRÉDITS EXPIRÉS =====
// Exécution quotidienne à 3h du matin pour vérifier les comptes à risque
cron.schedule('0 3 * * *', async () => {
  try {
    console.log('🔄 Vérification des comptes avec crédits expirés...');

    // Trouver les utilisateurs avec plus de 2 crédits expirés
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

    // Récupérer l'ID du gérant pour les notifications
    const [gerant] = await pool.query(`
      SELECT id FROM utilisateurs 
      WHERE role = 'gerant' 
      LIMIT 1
    `);

    const gerantId = gerant[0]?.id;

    // Traiter chaque utilisateur avec trop de crédits expirés
    for (const user of usersWithExpiredCredits) {
      // Désactiver le compte
      await pool.query(`UPDATE utilisateurs SET status = 'inactive' WHERE id = ?`, [user.id]);

      // Créer une notification pour le gérant
      if (gerantId) {
        await Notification.create(
          gerantId,
          'systeme',
          user.id,
          'compte_desactive',
          `Le compte client ${user.username} (ID: ${user.id}) a été désactivé automatiquement pour ${user.expired_credits_count} crédits expirés`
        );
      }

      // Envoyer un email au client
      await sendNotificationEmail(
        user.id,
        'Compte désactivé',
        `<p>Votre compte a été désactivé automatiquement car vous avez ${user.expired_credits_count} crédits expirés.</p>
         <p>Veuillez contacter le support pour plus d'informations.</p>`
      );

      console.log(
        `Compte désactivé: ${user.username} (${user.expired_credits_count} crédits expirés)`
      );
    }

    console.log('✅ Vérification des comptes avec crédits expirés terminée');
  } catch (err) {
    console.error('❌ Erreur lors de la vérification des comptes:', err);
  }
});
// ===== CRON JOB 2: VÉRIFICATIONS QUOTIDIENNES DES CRÉDITS =====
// Exécution quotidienne à minuit pour traiter les crédits
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('🔄 Vérifications quotidiennes des crédits...');

    // 1. Traiter les crédits expirés
    const [expiredCredits] = await pool.query(`
      SELECT dc.id, dc.id_utilisateur, dc.date_debut, dc.duree_credit, u.username 
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE dc.etat = 'actif'
      AND DATE_ADD(dc.date_debut, INTERVAL dc.duree_credit DAY) < CURDATE()
    `);

    // Marquer les crédits comme expirés et envoyer notifications
    for (const credit of expiredCredits) {
      await pool.query(`UPDATE details_credits SET etat = 'expiré' WHERE id = ?`, [credit.id]);

      await Notification.create(
        credit.id_utilisateur,
        'credit',
        credit.id,
        'expiration',
        `Votre crédit #${credit.id} a expiré`
      );

      await sendNotificationEmail(
        credit.id_utilisateur,
        'Votre crédit a expiré',
        `<p>Votre crédit #${credit.id} a expiré le ${new Date(
          new Date(credit.date_debut).getTime() + credit.duree_credit * 24 * 60 * 60 * 1000
        ).toLocaleDateString('fr-FR')}</p>`
      );
    }

    // 2. Alerter les crédits bientôt expirés (3-7 jours)
    const [expiringSoon] = await pool.query(`
      SELECT dc.id, dc.id_utilisateur, dc.date_debut, dc.duree_credit, u.username,
      DATEDIFF(DATE_ADD(dc.date_debut, INTERVAL dc.duree_credit DAY), CURDATE()) AS days_remaining
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE dc.etat = 'actif'
      AND DATEDIFF(DATE_ADD(dc.date_debut, INTERVAL dc.duree_credit DAY), CURDATE()) BETWEEN 3 AND 7
    `);

    // Envoyer notifications d'expiration proche
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

    console.log('✅ Vérifications quotidiennes terminées');
  } catch (err) {
    console.error('❌ Erreur lors des vérifications quotidiennes:', err);
  }
});

// ===== CRON JOB 3: VÉRIFICATIONS HORAIRES =====
// Vérifications des remboursements récents toutes les heures
cron.schedule('0 * * * *', async () => {
  try {
    console.log('🔄 Vérifications horaires des notifications...');

    // Crédits récemment remboursés (dernière heure)
    const [recentlyPaid] = await pool.query(`
      SELECT dc.id, dc.id_utilisateur, u.username 
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE dc.etat = 'remboursé'
      AND dc.date_dernier_paiement >= NOW() - INTERVAL 1 HOUR
    `);

    // Envoyer notification pour chaque crédit remboursé
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

    console.log('✅ Vérifications horaires terminées');
  } catch (err) {
    console.error('❌ Erreur lors des vérifications horaires:', err);
  }
});
// ===== CRON JOB 4: ALERTES DE STOCK ET RÉAPPROVISIONNEMENT AUTOMATIQUE =====
// Vérifie toutes les heures les produits sous le seuil et crée des commandes automatiques
cron.schedule('0 * * * *', async () => {
  try {
    console.log('🔄 Vérification des produits sous le seuil et réapprovisionnement automatique...');

    // 1. Récupérer les produits sous le seuil d'alerte avec info fournisseur
    const [lowStockProducts] = await pool.query(`
      SELECT 
        p.id,
        p.nom,
        p.quantite_stock,
        p.seuil_alerte,
        p.prix_achat,
        p.fournisseur_id,
        p.categorie_id,
        c.nom AS categorie_nom,
        f.nom AS fournisseur_nom,
        f.email AS fournisseur_email
      FROM produits p
      JOIN categories c ON p.categorie_id = c.id
      LEFT JOIN fournisseurs f ON p.fournisseur_id = f.id
      WHERE p.quantite_stock <= p.seuil_alerte
      AND p.seuil_alerte > 0
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

    // 3. Grouper les produits par fournisseur pour le réapprovisionnement
    const produitsParFournisseur = {};
    const produitsANotifier = [];

    for (const product of lowStockProducts) {
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
        [product.id]
      );

      // Si aucune notification récente n'existe, en créer une nouvelle
      if (!existingNotification || existingNotification.length === 0) {
        const message =
          `Produit "${product.nom}" (${product.categorie_nom}) sous le seuil: ` +
          `${product.quantite_stock} restants (seuil: ${product.seuil_alerte})`;

        await Notification.create(gerantId, 'stock', product.id, 'alerte_stock', message);

        console.log(`Notification créée pour: ${product.nom}`);

        // Envoyer un email au gérant
        await sendNotificationEmail(
          gerantId,
          `Alerte stock: ${product.nom}`,
          `<p>Le produit <strong>${product.nom}</strong> (${product.categorie_nom}) est sous le seuil d'alerte.</p>
           <p>Stock actuel: ${product.quantite_stock}</p>
           <p>Seuil d'alerte: ${product.seuil_alerte}</p>`
        );

        produitsANotifier.push(product);
      }

      // Grouper par fournisseur pour créer des commandes automatiques
      if (product.fournisseur_id) {
        if (!produitsParFournisseur[product.fournisseur_id]) {
          produitsParFournisseur[product.fournisseur_id] = {
            fournisseur_nom: product.fournisseur_nom,
            fournisseur_email: product.fournisseur_email,
            produits: [],
          };
        }

        // Vérifier s'il n'existe pas déjà une commande récente pour ce produit
        const [existingOrder] = await pool.query(
          `
          SELECT ca.id 
          FROM commandes_achat ca
          JOIN ligne_commande lc ON ca.id = lc.commande_id
          WHERE lc.produit_id = ? 
          AND ca.statut IN ('brouillon', 'validée')
          AND ca.date_commande >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
          LIMIT 1
        `,
          [product.id]
        );

        // Si pas de commande récente, ajouter le produit au réapprovisionnement
        if (!existingOrder || existingOrder.length === 0) {
          const quantiteCommande = product.seuil_alerte * 2; // Double du seuil d'alerte
          produitsParFournisseur[product.fournisseur_id].produits.push({
            produit_id: product.id,
            nom: product.nom,
            quantite: quantiteCommande,
            prix_unitaire: product.prix_achat || 0,
          });
        }
      }
    }

    // 4. Créer des commandes d'achat automatiques pour chaque fournisseur
    for (const [fournisseurId, data] of Object.entries(produitsParFournisseur)) {
      if (data.produits.length > 0) {
        try {
          // Importer le modèle Stock dynamiquement pour éviter les problèmes de circular import
          const { default: Stock } = await import('./models/stockModel.js');

          const commandeData = {
            fournisseur_id: parseInt(fournisseurId),
            produits: data.produits,
            agent_id: null, // Commande automatique, pas d'agent spécifique
          };

          const commande = await Stock.createCommandeAchat(commandeData);

          console.log(
            `✅ Commande automatique créée: #${commande.id} pour ${data.fournisseur_nom}`
          );

          // Créer une notification de réapprovisionnement pour le gérant
          const reapproMessage = `Commande automatique #${commande.id} créée pour ${data.fournisseur_nom}. ${data.produits.length} produit(s) commandé(s).`;

          await Notification.create(
            gerantId,
            'stock',
            commande.id,
            'réapprovisionnement',
            reapproMessage
          );

          // Envoyer email de notification au gérant
          const produitsListe = data.produits
            .map(p => `- ${p.nom}: ${p.quantite} unités à ${p.prix_unitaire}€`)
            .join('\n');

          await sendNotificationEmail(
            gerantId,
            `Commande automatique créée: #${commande.id}`,
            `<h3>Commande d'achat automatique créée</h3>
             <p><strong>Fournisseur:</strong> ${data.fournisseur_nom}</p>
             <p><strong>Numéro de commande:</strong> #${commande.id}</p>
             <p><strong>Montant total:</strong> ${commande.montant_total}€</p>
             <h4>Produits commandés:</h4>
             <pre>${produitsListe}</pre>
             <p><em>Cette commande a été créée automatiquement suite à la détection de produits sous le seuil d'alerte.</em></p>`
          );

          // Envoyer email au fournisseur si l'email est disponible
          if (data.fournisseur_email) {
            try {
              const fournisseurEmail = {
                from: `"Station-service" <${process.env.EMAIL_USER}>`,
                to: data.fournisseur_email,
                subject: `Nouvelle commande d'achat #${commande.id}`,
                html: `
                  <h2>Nouvelle commande d'achat</h2>
                  <p>Bonjour,</p>
                  <p>Nous avons créé une nouvelle commande d'achat:</p>
                  <ul>
                    <li><strong>Numéro de commande:</strong> #${commande.id}</li>
                    <li><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</li>
                    <li><strong>Montant total:</strong> ${commande.montant_total}DT</li>
                  </ul>
                  <h3>Produits commandés:</h3>
                  <table border="1" style="border-collapse: collapse; width: 100%;">
                    <tr style="background-color: #f2f2f2;">
                      <th style="padding: 8px;">Produit</th>
                      <th style="padding: 8px;">Quantité</th>
                      <th style="padding: 8px;">Prix unitaire</th>
                      <th style="padding: 8px;">Total</th>
                    </tr>
                    ${data.produits
                      .map(
                        p => `
                      <tr>
                        <td style="padding: 8px;">${p.nom}</td>
                        <td style="padding: 8px;">${p.quantite}</td>
                        <td style="padding: 8px;">${p.prix_unitaire}DT</td>
                        <td style="padding: 8px;">${(p.quantite * p.prix_unitaire).toFixed(2)}DT</td>
                      </tr>
                    `
                      )
                      .join('')}
                  </table>
                  <p>Merci de confirmer la réception de cette commande.</p>
                  <p>Cordialement,<br>L'équipe de gestion</p>
                `,
              };

              await transporter.sendMail(fournisseurEmail);
              console.log(`📧 Email envoyé au fournisseur: ${data.fournisseur_email}`);
            } catch (emailError) {
              console.error(
                `❌ Erreur envoi email fournisseur ${data.fournisseur_email}:`,
                emailError
              );
            }
          }
        } catch (commandeError) {
          console.error(
            `❌ Erreur création commande pour fournisseur ${data.fournisseur_nom}:`,
            commandeError
          );
        }
      }
    }

    console.log(
      `✅ Vérification terminée: ${lowStockProducts.length} produits sous le seuil, ${Object.keys(produitsParFournisseur).length} fournisseurs traités`
    );
  } catch (err) {
    console.error('❌ Erreur lors de la vérification du stock et réapprovisionnement:', err);
  }
});
// ===== CRON JOB 5: RÉSUMÉ HEBDOMADAIRE =====
// Exécution chaque lundi à 9h pour envoyer un résumé d'activité
cron.schedule('0 9 * * 1', async () => {
  try {
    console.log('🔄 Génération du résumé hebdomadaire...');

    // Récupérer tous les utilisateurs actifs
    const [users] = await pool.query(`
      SELECT id, username, email FROM utilisateurs WHERE status = 'active'
    `);

    for (const user of users) {
      // Calculer les statistiques de la semaine passée
      const [[{ transactions }]] = await pool.query(
        `
        SELECT COUNT(*) AS transactions 
        FROM transactions t
        JOIN details_credits dc ON t.id_credit = dc.id
        WHERE dc.id_utilisateur = ? 
        AND t.date_transaction >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      `,
        [user.id]
      );

      const [[{ payments }]] = await pool.query(
        `
        SELECT SUM(montant_paye) AS payments 
        FROM paiements_credits 
        WHERE id_utilisateur = ? 
        AND date_paiement >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      `,
        [user.id]
      );

      // Créer notification de résumé
      await Notification.create(
        user.id,
        'systeme',
        null,
        'resume_hebdo',
        `Résumé hebdomadaire: ${transactions} transactions, ${payments || 0} DT payés`
      );

      // Envoyer email de résumé si l'utilisateur a un email
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

    console.log('✅ Résumé hebdomadaire terminé');
  } catch (err) {
    console.error('❌ Erreur lors du résumé hebdomadaire:', err);
  }
});
// ===== DÉMARRAGE DU SERVEUR =====
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server ready`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
