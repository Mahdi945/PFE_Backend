import MessageController from '../controllers/messageController.js';
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES MESSAGES ====================
router.post('/', requireAuth, MessageController.sendMessage);
router.get('/conversation/:user1/:user2', requireAuth, MessageController.getConversation);
router.get('/user/:userId', requireAuth, MessageController.getUserMessages);
router.get('/unread-count/:userId', requireAuth, MessageController.getUnreadCount);
router.put('/mark-as-read', requireAuth, MessageController.markAsRead);
router.get('/contacts/:userId', requireAuth, MessageController.getAllContacts);
export default router;