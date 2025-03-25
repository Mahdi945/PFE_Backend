import express from 'express';
import PompeController from '../controllers/PompeController.js';

const router = express.Router();

// Routes pour gérer les pompes
router.post('/pompes', PompeController.addPompe);  // Ajouter une pompe
router.get('/pompes', PompeController.getAllPompes);  // Récupérer toutes les pompes
router.get('/pompes/:id', PompeController.getPompeById);  // Récupérer une pompe par ID
router.put('/pompes/:id', PompeController.updatePompe);  // Mettre à jour une pompe
router.delete('/pompes/:id', PompeController.deletePompe);  // Supprimer une pompe

export default router;
