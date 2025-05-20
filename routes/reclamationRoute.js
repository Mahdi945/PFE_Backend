import express from 'express';
import * as ReclamationController from '../controllers/reclamationController.js';
import passport from 'passport';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// Middleware de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// ==================== ROUTES RÉCLAMATIONS ====================
router.post(
  '/add',
  requireAuth,
  [
    body('id_client').isInt().withMessage('ID client doit être un nombre entier'),
    body('objet')
      .trim()
      .notEmpty()
      .withMessage("L'objet est requis")
      .isLength({ max: 100 })
      .withMessage("L'objet ne doit pas dépasser 100 caractères"),
    body('raison')
      .trim()
      .notEmpty()
      .withMessage('La raison est requise')
      .isIn(['produit', 'service', 'livraison', 'facturation', 'autre'])
      .withMessage('Raison invalide'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('La description est requise')
      .isLength({ max: 1000 })
      .withMessage('La description ne doit pas dépasser 1000 caractères'),
  ],
  validate,
  ReclamationController.createReclamation,
);

router.get(
  '/client/:id_client',
  requireAuth,
  [param('id_client').isInt().withMessage('ID client doit être un nombre entier')],
  validate,
  ReclamationController.getClientReclamations,
);

router.get(
  '/:id',
  requireAuth,
  [param('id').isInt().withMessage('ID réclamation doit être un nombre entier')],
  validate,
  ReclamationController.getReclamationDetails,
);

router.put(
  '/:id/statut',
  requireAuth,
  [
    param('id').isInt().withMessage('ID réclamation doit être un nombre entier'),
    body('statut')
      .trim()
      .notEmpty()
      .withMessage('Le statut est requis')
      .isIn(['nouveau', 'en_cours', 'resolu', 'fermer'])
      .withMessage('Statut invalide'),
  ],
  validate,
  ReclamationController.updateReclamationStatus,
);

router.get('/', requireAuth, ReclamationController.getAllReclamations);

export default router;
