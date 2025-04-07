import express from 'express';
import CreditController from '../controllers/CreditController.js';
import VehiculeController from '../controllers/VehiculeController.js';
import TransactionController from '../controllers/TransactionController.js';

const router = express.Router();

// Routes pour la gestion des crédits
router.post('/credits/add', CreditController.createCredit); // Ajout d'un crédit
router.get('/credits/all', CreditController.getAllCredits);  // Récupérer tous les crédits
router.get('/credits/:id_credit', CreditController.getCreditById); // Récupérer un crédit par ID
router.put('/credits/update', CreditController.updateCredit); // Mettre à jour le crédit

// Routes pour les véhicules
router.post('/vehicules/add', VehiculeController.create);  // Ajouter un véhicule
router.get('/vehicules/:id', VehiculeController.getVehicule); // Récupérer un véhicule par ID
// Route pour récupérer les véhicules d'un client
router.get('/vehicules/client/:id_utilisateur', VehiculeController.getVehiculesByClient);
// Route pour récupérer les véhicules d'un crédit (anciennement contrat)
router.get('/vehicules/credit/:id_credit', VehiculeController.getVehiculesByCredit);

// Routes pour les transactions
router.post('/transactions/create', TransactionController.createTransaction); // Créer une transaction

export default router;
