import express from 'express';
import AffectationCalendrierController from '../controllers/AffectationCalendrierController.js';

const router = express.Router();

// Ajouter une affectation manuelle
router.post('/add-manual', AffectationCalendrierController.addAffectationManuelle);

// Ajouter une affectation automatique équitable
router.post('/add-automatic', AffectationCalendrierController.addAffectationAutomatiqueEquitable);

// Récupérer les affectations d'un jour spécifique
router.get('/jour/:calendrier_id', AffectationCalendrierController.getAffectationsByJour);

// Récupérer les affectations d'un mois et année
router.get('/month/:mois/year/:annee', AffectationCalendrierController.getAffectationsByMonthYear);

export default router;
