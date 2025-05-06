import express from 'express';
import { body, param, validationResult } from 'express-validator';
import authController from '../controllers/authController.js';
import passport from 'passport';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Middleware de validation
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware d'authentification personnalisé
const authenticateJWT = (req, res, next) => {
  // Liste des routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = [
    '/login',
    '/request-password-reset',
    '/reset-password'
  ];

  // Vérifier si la route actuelle est publique
  const isPublicRoute = publicRoutes.some(route => req.path.endsWith(route));

  if (isPublicRoute) {
    return next();
  }

  // Appliquer l'authentification JWT pour les routes protégées
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Si le token est expiré ou invalide
      return res.status(401).json({ 
        success: false,
        message: 'Session expirée ou non autorisée. Veuillez vous reconnecter.'
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Appliquer le middleware d'authentification à toutes les routes
router.use(authenticateJWT);

// Configuration Multer pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers image (JPG, JPEG, PNG) sont autorisés'), false);
  }
};

const upload = multer({ storage, fileFilter });

// ==================== ROUTES PUBLIQUES ====================

// Connexion utilisateur
router.post('/login', authController.loginUser);

// Demande de réinitialisation de mot de passe
router.post(
  '/request-password-reset',
  [
    body('email').isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long')
  ],
  validateRequest,
  authController.requestPasswordReset
);

// Réinitialisation du mot de passe
router.put(
  '/reset-password',
  [
    body('newPassword').isLength({ min: 6, max: 20 }).withMessage('Le mot de passe doit contenir entre 6 et 20 caractères')
  ],
  validateRequest,
  authController.updatePassword
);

// ==================== ROUTES PROTÉGÉES ====================

// Inscription utilisateur (protégée)
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long'),
    body('password').isLength({ min: 8, max: 20 }).withMessage('Le mot de passe doit contenir entre 8 et 20 caractères'),
    body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis').isLength({ min: 3, max: 50 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères'),
    body('numero_telephone').isMobilePhone().withMessage('Numéro de téléphone invalide').isLength({ max: 14 }).withMessage('Le numéro de téléphone est trop long')
  ],
  validateRequest,
  authController.registerUser
);

// Profil utilisateur
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Session expirée. Veuillez vous reconnecter.' });
  }
  res.json(req.user);
});

// Déconnexion
router.post('/logout', authController.logoutUser);

// Mise à jour photo de profil
router.put('/update-photo/:id', upload.single('photo'), authController.updateUserPhoto);

// Mise à jour profil utilisateur
router.put('/update-profile/:id', authController.updateUserProfile);

// Mise à jour mot de passe (utilisateur connecté)
router.put(
  '/update-password',
  [
    body('newPassword').isLength({ min: 6, max: 20 }).withMessage('Le mot de passe doit contenir entre 6 et 20 caractères')
  ],
  validateRequest,
  authController.updatePasswordConnected
);

// Mise à jour utilisateur
router.put(
  '/update/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier'),
    body('email').optional().isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long'),
    body('username').optional().isLength({ min: 3, max: 50 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères'),
    body('numeroTelephone').optional().isMobilePhone().withMessage('Numéro de téléphone invalide').isLength({ max: 15 }).withMessage('Le numéro de téléphone est trop long'),
    body('role').optional().isIn(['gerant', 'cogerant','client','caissier','pompiste']).withMessage('Rôle invalide')
  ],
  validateRequest,
  authController.updateUser
);

// Désactivation utilisateur
router.put(
  '/desactiver/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier'),
    body('reason').notEmpty().withMessage('Une raison est requise pour la désactivation')
  ],
  validateRequest,
  authController.deactivateUser
);

// Réactivation utilisateur
router.put(
  '/reactiver/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier')
  ],
  validateRequest,
  authController.reactivateUser
);

// Récupération utilisateur par email
router.get(
  '/user/email/:email',
  [
    param('email').isEmail().withMessage('Email invalide').isLength({ max: 255 }).withMessage('Email trop long')
  ],
  validateRequest,
  authController.getUserByEmail
);

// Récupération utilisateur par username
router.get(
  '/user/username/:username',
  [
    param('username').notEmpty().withMessage('Le nom d\'utilisateur est requis').isLength({ min: 3, max: 50 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères')
  ],
  validateRequest,
  authController.getUserByUsername
);

// Récupération utilisateurs par rôle
router.get(
  '/user/role/:role',
  [
    param('role').isIn(['gerant', 'cogerant','client','caissier','pompiste']).withMessage('Rôle invalide')
  ],
  validateRequest,
  authController.getUserByRole
);

// Récupération de tous les utilisateurs
router.get('/users', authController.getAllUsers);

// Suppression utilisateur
router.delete(
  '/user/:id',
  [
    param('id').isInt().withMessage('L\'ID doit être un entier')
  ],
  validateRequest,
  authController.deleteUser
);

export default router;