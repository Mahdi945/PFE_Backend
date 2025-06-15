import express from 'express';
import AffectationCalendrierController from '../controllers/AffectationCalendrierController.js';
import passport from 'passport';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES PROTÉGÉES ====================

// Ajouter une affectation manuelle
router.post('/add-manual', requireAuth, AffectationCalendrierController.addAffectationManuelle);

// Ajouter une affectation automatique équitable
router.post(
  '/add-automatic',
  requireAuth,
  AffectationCalendrierController.addAffectationAutomatiqueEquitable
);

// Récupérer les affectations d'un mois et année
router.get(
  '/month/:mois/year/:annee',
  requireAuth,
  AffectationCalendrierController.getAffectationsByMonthYear
);

// Mettre à jour une affectation
router.put('/update/:id', requireAuth, AffectationCalendrierController.updateAffectation);

// Régénérer les affectations
router.post('/regenerate', requireAuth, AffectationCalendrierController.regenerateAffectations);

// Récupérer un enregistrement calendrier par date
router.get('/date/:date', requireAuth, AffectationCalendrierController.getAffectationsByDate);

// Obtenir l'affectation actuelle d'un pompiste
router.get(
  '/current/:pompiste_id',
  requireAuth,
  AffectationCalendrierController.getCurrentAffectation
);

// Obtenir les pistolets disponibles pour une affectation
router.get(
  '/pistolets/:affectation_id',
  requireAuth,
  AffectationCalendrierController.getAvailablePistolets
);

export default router;
