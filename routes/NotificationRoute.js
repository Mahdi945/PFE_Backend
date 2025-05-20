import NotificationController from '../controllers/NotificationController.js';
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES NOTIFICATIONS ====================
router.get('/:id_utilisateur', requireAuth, NotificationController.getNotifications);
router.put('/mark-as-read', requireAuth, NotificationController.markAsRead);
router.put('/mark-all-as-read', requireAuth, NotificationController.markAllAsRead);
router.get('/unread-count/:id_utilisateur', requireAuth, NotificationController.getUnreadCount);
router.delete('/hide', requireAuth, NotificationController.hideNotification);
router.delete('/hide-all', requireAuth, NotificationController.hideAllNotifications);

export default router;
