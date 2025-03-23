import express from 'express';
import { body, param, validationResult } from 'express-validator'; // Importer les fonctions nécessaires d'Express Validator
import authController from '../controllers/authController.js';
import passport from 'passport';
const router = express.Router();

// Fonction pour vérifier les erreurs de validation
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route pour l'inscription d'un utilisateur
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long'), // Limiter la longueur de l'email
    body('password').isLength({ min: 6, max: 20 }).withMessage('Le mot de passe doit contenir entre 6 et 20 caractères'), // Limiter la longueur du mot de passe
    body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis').isLength({ min: 3, max: 50 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères'), // Limiter la longueur du nom d'utilisateur
    body('numeroTelephone').isMobilePhone().withMessage('Numéro de téléphone invalide').isLength({ max: 8 }).withMessage('Le numéro de téléphone est trop long') // Limiter la longueur du numéro de téléphone
  ],
  validateRequest,
  authController.registerUser
);

// Route pour la connexion d'un utilisateur
router.post(
  '/login',
  [
   
    body('password')
      .notEmpty().withMessage('Le mot de passe est requis')
      .isLength({ min: 6, max: 20 }).withMessage('Le mot de passe doit contenir entre 6 et 20 caractères') // Longueur maximale pour le mot de passe
  ],
  validateRequest, // Le middleware pour valider les erreurs
  authController.loginUser // Contrôleur pour la connexion
);

// Données d'utilisateur authentifié
router.get('/profile', passport.authenticate('jwt', { session: false }), authController.getUserProfile);

router.post('/logout', authController.logoutUser);

router.put('/update-password',
  [
    body('newPassword')
      .isLength({ min: 6, max: 20 })
      .withMessage('Le mot de passe doit contenir entre 6 et 20 caractères') // Validation du mot de passe
  ],
  validateRequest,
  passport.authenticate('jwt', { session: false }), 
  authController.updatePasswordConnected);
// Route pour la mise à jour d'un utilisateur
router.put(
  '/update/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier'), // Validation de l'ID
    body('email').optional().isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long'), // Email valide et limité à 255 caractères
    body('username').optional().isLength({ min: 3, max: 50 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères'), // Nom d'utilisateur valide et limité à 50 caractères
    body('numeroTelephone').optional().isMobilePhone().withMessage('Numéro de téléphone invalide').isLength({ max: 15 }).withMessage('Le numéro de téléphone est trop long'), // Limiter le numéro de téléphone
    body('role').optional().isIn(['gerant', 'cogerant','client','caissier','pompiste']).withMessage('Rôle invalide') // Validation du rôle
  ],
  validateRequest,
  authController.updateUser
);
// Route pour demander un lien de réinitialisation de mot de passe
router.post(
  '/request-password-reset',
  [
    body('email').isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long') // Validation de l'email
  ],
  validateRequest,
  authController.requestPasswordReset // Nouveau contrôleur pour demander un lien de réinitialisation
);

// Route pour mettre à jour le mot de passe via un lien sécurisé
router.put(
  '/reset-password',
  [
    body('newPassword')
      .isLength({ min: 6, max: 20 })
      .withMessage('Le mot de passe doit contenir entre 6 et 20 caractères') // Validation du mot de passe
  ],
  validateRequest,
  passport.authenticate('jwt', { session: false }), // Utilisation de Passport pour vérifier le token
  authController.updatePassword // Contrôleur pour mettre à jour le mot de passe
);
// Désactivation d'un utilisateur
router.put(
  '/desactiver/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier'),
    body('reason').notEmpty().withMessage('Une raison est requise pour la désactivation')
  ],
  validateRequest,
  authController.deactivateUser
);

// Réactivation d'un utilisateur
router.put(
  '/reactiver/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier')
  ],
  validateRequest,
  authController.reactivateUser
);

// Route pour récupérer un utilisateur par email
router.get(
  '/user/email/:email',
  [
    param('email').isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long') // Limiter la longueur de l'email
  ],
  validateRequest,
  authController.getUserByEmail
);

// Route pour récupérer un utilisateur par nom d'utilisateur
router.get(
  '/user/username/:username',
  [
    param('username').notEmpty().withMessage('Le nom d\'utilisateur est requis').isLength({ min: 3, max: 50 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères') // Limiter la longueur du nom d'utilisateur
  ],
  validateRequest,
  authController.getUserByUsername
);

// Route pour récupérer tous les utilisateurs d'un certain rôle
router.get(
  '/user/role/:role',
  [
    param('role').isIn(['gerant', 'cogerant','client','caissier','pompiste']).withMessage('Rôle invalide') // Validation du rôle
  ],
  validateRequest,
  authController.getUserByRole
);

// Route pour récupérer tous les utilisateurs
router.get('/users', authController.getAllUsers);

// Route pour supprimer un utilisateur par ID
router.delete(
  '/user/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier') // Validation de l'ID
  ],
  validateRequest,
  authController.deleteUser
);

export default router; // Exporter le routeur
