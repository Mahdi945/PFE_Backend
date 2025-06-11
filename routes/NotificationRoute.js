import NotificationController from '../controllers/NotificationController.js';
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES NOTIFICATIONS ====================

// Récupère toutes les notifications d'un utilisateur spécifique
router.get('/:id_utilisateur', requireAuth, NotificationController.getNotifications);

// Marque une notification spécifique comme lue pour mettre à jour son statut
router.put('/mark-as-read', requireAuth, NotificationController.markAsRead);

// Marque toutes les notifications d'un utilisateur comme lues en une seule opération
router.put('/mark-all-as-read', requireAuth, NotificationController.markAllAsRead);

// Retourne le nombre de notifications non lues pour afficher le badge de compteur
router.get('/unread-count/:id_utilisateur', requireAuth, NotificationController.getUnreadCount);

// Cache une notification spécifique sans la supprimer définitivement de la base
router.delete('/hide', requireAuth, NotificationController.hideNotification);

// Cache toutes les notifications d'un utilisateur pour nettoyer son interface
router.delete('/hide-all', requireAuth, NotificationController.hideAllNotifications);

export default router;
