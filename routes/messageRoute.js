import MessageController from '../controllers/messageController.js';
import express from 'express';
import passport from 'passport';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

// =====================================================================
//   MIDDLEWARES DE SÉCURITÉ ET VALIDATION
// =====================================================================

// Middleware d'authentification JWT obligatoire pour toutes les routes
const requireAuth = passport.authenticate('jwt', { session: false });

// Middleware de validation des erreurs
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array(),
    });
  }
  next();
};

// =====================================================================
//   RÈGLES DE VALIDATION DES MESSAGES
// =====================================================================

// Validation pour l'envoi de messages - Protection contre DoS
const validateSendMessage = [
  body('receiverId')
    .isInt({ min: 1 })
    .withMessage('ID du destinataire invalide')
    .notEmpty()
    .withMessage('ID du destinataire requis'),

  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Le message doit contenir entre 1 et 1000 caractères')
    .matches(/^[a-zA-Z0-9\s\u00C0-\u017F.,!?;:()\-\'"@#$%&*+=\[\]{}|\\/<>]*$/)
    .withMessage('Le message contient des caractères non autorisés')
    .notEmpty()
    .withMessage('Le contenu du message est requis'),

  // Validation supplémentaire pour éviter le spam
  body('content').custom(value => {
    // Éviter les messages répétitifs (même caractère répété)
    const repeatedChar = /(.)\1{10,}/;
    if (repeatedChar.test(value)) {
      throw new Error('Message suspect détecté (caractères répétitifs)');
    }
    return true;
  }),
];

// Validation pour les paramètres d'utilisateur
const validateUserId = [
  param('userId')
    .isInt({ min: 1 })
    .withMessage('ID utilisateur invalide')
    .notEmpty()
    .withMessage('ID utilisateur requis'),
];

// Validation pour les conversations entre deux utilisateurs
const validateConversation = [
  param('user1').isInt({ min: 1 }).withMessage('ID utilisateur 1 invalide'),
  param('user2')
    .isInt({ min: 1 })
    .withMessage('ID utilisateur 2 invalide')
    .custom((value, { req }) => {
      if (value === req.params.user1) {
        throw new Error('Les deux utilisateurs ne peuvent pas être identiques');
      }
      return true;
    }),
];

// Validation pour marquer les messages comme lus
const validateMarkAsRead = [
  body('senderId')
    .isInt({ min: 1 })
    .withMessage("ID de l'expéditeur invalide")
    .notEmpty()
    .withMessage("ID de l'expéditeur requis"),

  body('receiverId')
    .isInt({ min: 1 })
    .withMessage('ID du destinataire invalide')
    .notEmpty()
    .withMessage('ID du destinataire requis'),
];

// =====================================================================
// 🚀 ROUTES API MESSAGERIE
// =====================================================================

/**
 * POST / - Envoi d'un nouveau message
 */
router.post(
  '/',
  requireAuth,
  validateSendMessage,
  handleValidationErrors,
  MessageController.sendMessage
);

/**
 *  GET /conversation/:user1/:user2 - Récupération d'une conversation
 */
router.get(
  '/conversation/:user1/:user2',
  requireAuth,
  validateConversation,
  handleValidationErrors,
  MessageController.getConversation
);

/**
 * GET /user/:userId - Messages d'un utilisateur (liste des contacts)
 */
router.get(
  '/user/:userId',
  requireAuth,
  validateUserId,
  handleValidationErrors,
  MessageController.getUserMessages
);

/**
 *  GET /unread-count/:userId - Compteur de messages non lus
 */
router.get(
  '/unread-count/:userId',
  requireAuth,
  validateUserId,
  handleValidationErrors,
  MessageController.getUnreadCount
);

/**
 *   PUT /mark-as-read - Marquer les messages comme lus
 */
router.put(
  '/mark-as-read',
  requireAuth,
  validateMarkAsRead,
  handleValidationErrors,
  MessageController.markAsRead
);

/**
 *  GET /contacts/:userId - Liste de tous les contacts d'un utilisateur
 */
router.get(
  '/contacts/:userId',
  requireAuth,
  validateUserId,
  handleValidationErrors,
  MessageController.getAllContacts
);

export default router;
