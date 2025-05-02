import express from 'express';
import AffectationCalendrierController from '../controllers/AffectationCalendrierController.js';

const router = express.Router();

// Ajouter une affectation manuelle
router.post('/add-manual', AffectationCalendrierController.addAffectationManuelle);

// Ajouter une affectation automatique équitable
router.post('/add-automatic', AffectationCalendrierController.addAffectationAutomatiqueEquitable);

// Récupérer les affectations d'un jour spécifique
//router.get('/jour/:calendrier_id', AffectationCalendrierController.getAffectationsByJour);

// Récupérer les affectations d'un mois et année
router.get('/month/:mois/year/:annee', AffectationCalendrierController.getAffectationsByMonthYear);

// Mettre à jour une affectation
router.put('/update/:id', AffectationCalendrierController.updateAffectation);
router.post('/regenerate', AffectationCalendrierController.regenerateAffectations);
// Récupérer un enregistrement calendrier par date
router.get('/date/:date', AffectationCalendrierController.getAffectationsByDate);

// Nouvelle route: Obtenir l'affectation actuelle d'un pompiste (avec gestion des shifts)
router.get('/current/:pompiste_id', AffectationCalendrierController.getCurrentAffectation);

// Nouvelle route: Obtenir les pistolets disponibles pour une affectation
router.get('/pistolets/:affectation_id', AffectationCalendrierController.getAvailablePistolets);


export default router;
