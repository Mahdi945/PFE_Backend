import express from 'express';
import passport from 'passport';
import PistoletController from '../controllers/PistoletController.js';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES PROTÉGÉES ====================

// CRUD de base
router.post('/add', requireAuth, PistoletController.addPistolet);
router.get('/', requireAuth, PistoletController.getAllPistolets);
router.get('/pompe/:pompe_id', requireAuth, PistoletController.getPistoletsByPompeId);

// Gestion des statuts
router.put('/update-statut', requireAuth, PistoletController.updateStatutPistolet);
router.put('/:id/statut', requireAuth, PistoletController.updateStatut);

// Routes dépréciées (à remplacer)
router.put('/update-ouverture', requireAuth, PistoletController.updateIndexOuverture);
router.put('/update-fermeture', requireAuth, PistoletController.updateIndexFermeture);

// Gestion des relevés
router.post('/releves', requireAuth, PistoletController.enregistrerReleve);
router.post('/releves/manuel', requireAuth, PistoletController.ajouterReleveManuel);
// Route pour un pistolet spécifique
router.get('/:pistolet_id/historique', requireAuth, PistoletController.getHistoriqueReleves);

// Nouvelle route pour tous les pistolets
router.get('/historique', requireAuth, PistoletController.getHistoriqueReleves);

// Rapports
router.post('/rapports/generer', requireAuth, PistoletController.genererRapportJournalier);
router.post('/rapports/manuel', requireAuth, PistoletController.ajouterRapportManuel);
router.get('/revenus-journaliers', requireAuth, PistoletController.getRevenusJournaliers);

export default router;
