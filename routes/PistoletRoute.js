import express from 'express';
import PistoletController from '../controllers/PistoletController.js';

const router = express.Router();

// Ajouter un pistolet
router.post('/add', PistoletController.addPistolet);

// Mettre à jour l'index d'ouverture d'un pistolet
router.put('/update-ouverture', PistoletController.updateIndexOuverture);

// Mettre à jour l'index de fermeture d'un pistolet
router.put('/update-fermeture', PistoletController.updateIndexFermeture);

// Récupérer les pistolets d'une pompe
router.get('/pompe/:pompe_id', PistoletController.getPistoletsByPompeId);

// Mettre à jour le statut d'un pistolet
router.put('/update-statut', PistoletController.updateStatutPistolet);
// Récupérer tous les pistolets
router.get('/', PistoletController.getAllPistolets);

export default router;