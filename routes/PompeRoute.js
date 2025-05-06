import express from 'express';
import passport from 'passport';
import PompeController from '../controllers/PompeController.js';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES PROTÉGÉES ====================

// Ajouter une pompe
router.post('/pompes', requireAuth, PompeController.addPompe);

// Récupérer toutes les pompes
router.get('/pompes', requireAuth, PompeController.getAllPompes);

// Récupérer une pompe par ID
router.get('/pompes/:id', requireAuth, PompeController.getPompeById);

// Mettre à jour une pompe
router.put('/pompes/:id', requireAuth, PompeController.updatePompe);

// Supprimer une pompe
router.delete('/pompes/:id', requireAuth, PompeController.deletePompe);

// Récupérer les pompes avec filtrage
router.get('/pompes/filtrées', requireAuth, PompeController.getPompesByFilters);

export default router;