import NotificationController from '../controllers/NotificationController.js';
import express from 'express';
const router = express.Router();
// Routes pour les Credits
router.get('/:id_utilisateur', NotificationController.getNotifications);
router.put('/mark-as-read', NotificationController.markAsRead);
router.put('/mark-all-as-read', NotificationController.markAllAsRead);
router.get('/unread-count/:id_utilisateur', NotificationController.getUnreadCount);
export default router;