import express from 'express';
import CreditController from '../controllers/CreditController.js';
import VehiculeController from '../controllers/VehiculeController.js';
import TransactionController from '../controllers/TransactionController.js';
import PaimentController from '../controllers/PaimentController.js';
const router = express.Router();

// Routes pour la gestion des crédits
router.post('/credits/add', CreditController.createCredit);
router.get('/credits/all', CreditController.getAllCredits);
router.get('/credits/:id_credit', CreditController.getCreditById);
router.put('/credits/update', CreditController.updateCredit);
router.put('/credits/state', CreditController.updateCreditState); // Mettre à jour l'état d'un crédit

// Routes pour les paiements
router.post('/paiments/create', PaimentController.createPayment);
router.get('/paiments/all', PaimentController.getAllPayments);
router.get('/paiments/credit/:id_credit', PaimentController.getPaymentsByCredit);
router.get('/paiments/utilisateur/:id_utilisateur', PaimentController.getPaymentsByUser);
router.get('/paiments/reference/:reference', PaimentController.getPaymentByReference);


// Routes pour les véhicules
router.post('/vehicules/add', VehiculeController.create);  // Ajouter un véhicule
router.get('/vehicules/:id', VehiculeController.getVehicule); // Récupérer un véhicule par ID
router.get('/vehicules', VehiculeController.getAllVehicules); // Récupérer tous les véhicules
// Routes pour les véhicules
router.get('/vehicules/immatriculation/:immatriculation', VehiculeController.getVehiculeByImmatriculation); // Récupérer un véhicule par immatriculation

router.put('/vehicules/update', VehiculeController.updateVehicule); // Mettre à jour un véhicule
router.delete('/vehicules/:id', VehiculeController.deleteVehicule); // Supprimer un véhicule
// Route pour récupérer les véhicules d'un utilisateur par son username
router.get('/vehicules/client/:username', VehiculeController.getVehiculesByClient); // Récupérer les véhicules d'un client
router.get('/vehicules/credit/:id_credit', VehiculeController.getVehiculesByCredit); // Récupérer les véhicules d'un crédit

// Routes pour les transactions
router.post('/transactions/create', TransactionController.createTransaction); // Créer une transaction
router.get('/transactions/all', TransactionController.getAllTransactions);
router.get('/transactions/utilisateur/:id_utilisateur', TransactionController.getTransactionsByUser);
export default router;
