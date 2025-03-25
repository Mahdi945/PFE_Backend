import express from 'express';
import ContratController from '../controllers/ContratController.js';
import VehiculeController from '../controllers/VehiculeController.js';
import TransactionController from '../controllers/TransactionController.js';

const router = express.Router();

// Routes pour les contrats
router.post('/contrats/add', ContratController.createContrat);
router.get('/contrats/all', ContratController.getAllContrats);

// Routes pour les véhicules
router.post('/vehicules/add', VehiculeController.create);
router.get('/vehicules/:id', VehiculeController.getVehicule);
// Route pour récupérer les véhicules d'un client
router.get('/vehicules/client/:id_utilisateur', VehiculeController.getVehiculesByClient);
// Route pour récupérer les véhicules d'un contrat
router.get('/vehicules/contrat/:id_contrat', VehiculeController.getVehiculesByContrat);

// Routes pour les transactions
router.post('/transactions/create', TransactionController.createTransaction);

export default router;
