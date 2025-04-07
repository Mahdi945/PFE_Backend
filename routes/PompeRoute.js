import express from 'express';
import PompeController from '../controllers/PompeController.js';

const router = express.Router();

// Routes pour gérer les pompes
router.post('/pompes', PompeController.addPompe);  // Ajouter une pompe
router.get('/pompes', PompeController.getAllPompes);  // Récupérer toutes les pompes
router.get('/pompes/:id', PompeController.getPompeById);  // Récupérer une pompe par ID
router.put('/pompes/:id', PompeController.updatePompe);  // Mettre à jour une pompe
router.delete('/pompes/:id', PompeController.deletePompe);  // Supprimer une pompe
// Route pour récupérer les pompes avec filtrage
router.get('/pompes/filtrées', PompeController.getPompesByFilters);  // Récupérer les pompes avec filtre

// Route pour récupérer tous les pompistes
//router.get('/pompistes', PompeController.getPompistes);  // Récupérer tous les pompistes

// Route pour récupérer tous les postes
//router.get('/postes', PompeController.getPostes);  // Récupérer tous les postes
export default router;
