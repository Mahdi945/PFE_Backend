import express from 'express';
import PistoletController from '../controllers/PistoletController.js';

const router = express.Router();

// Routes existantes
router.post('/add', PistoletController.addPistolet);
router.put('/update-ouverture', PistoletController.updateIndexOuverture); // À marquer comme déprécié
router.put('/update-fermeture', PistoletController.updateIndexFermeture); // À marquer comme déprécié
router.get('/pompe/:pompe_id', PistoletController.getPistoletsByPompeId);
router.put('/update-statut', PistoletController.updateStatutPistolet);
router.get('/', PistoletController.getAllPistolets);

// Nouvelles routes
router.post('/releves', PistoletController.enregistrerReleve);
router.post('/rapports/generer', PistoletController.genererRapportJournalier);
router.get('/:pistolet_id/historique', PistoletController.getHistoriqueReleves);
router.get('/revenus-journaliers', PistoletController.getRevenusJournaliers);
router.put('/:id/statut',PistoletController.updateStatut);
router.post('/releves/manuel', PistoletController.ajouterReleveManuel);
// Ajouter cette route dans le fichier de routes
router.post('/rapports/manuel', PistoletController.ajouterRapportManuel);
export default router;