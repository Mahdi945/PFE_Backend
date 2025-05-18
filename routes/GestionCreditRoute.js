import express from 'express';
import passport from 'passport';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import CreditController from '../controllers/CreditController.js';
import VehiculeController from '../controllers/VehiculeController.js';
import TransactionController from '../controllers/TransactionController.js';
import PaimentController from '../controllers/PaimentController.js';
import DashboardController from '../controllers/DashboardController.js';

// Configuration ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Middleware d'authentification JWT simple
const requireAuth = passport.authenticate('jwt', { session: false });

// Configuration Multer (identique à la version précédente)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/transactions');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, `transaction_${Date.now()}${fileExt}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  }
});

// ==================== ROUTES CRÉDITS ====================
router.post('/credits/add', requireAuth, CreditController.createCredit);
router.get('/credits/all', requireAuth, CreditController.getAllCredits);
router.get('/credits/:id_credit', requireAuth, CreditController.getCreditById);
router.put('/credits/update', requireAuth, CreditController.updateCredit);
router.put('/credits/state', requireAuth, CreditController.updateCreditState);
router.post('/credits/renew', requireAuth, CreditController.renewCredit);

// ==================== ROUTES PAIEMENTS ====================
router.post('/paiments/create', requireAuth, PaimentController.createPayment);
router.get('/paiments/all', requireAuth, PaimentController.getAllPayments);
router.get('/paiments/credit/:id_credit', requireAuth, PaimentController.getPaymentsByCredit);
router.get('/paiments/utilisateur/:id_utilisateur', requireAuth, PaimentController.getPaymentsByUser);
router.get('/paiments/reference/:reference', requireAuth, PaimentController.getPaymentByReference);

// ==================== ROUTES VÉHICULES ====================
router.post('/vehicules/add', requireAuth, VehiculeController.create);
router.get('/vehicules/:id', requireAuth, VehiculeController.getVehicule);
router.get('/vehicules', requireAuth, VehiculeController.getAllVehicules);
router.get('/vehicules/immatriculation/:immatriculation', requireAuth, VehiculeController.getVehiculeByImmatriculation);
router.put('/vehicules/update', requireAuth, VehiculeController.updateVehicule);
router.delete('/vehicules/:id', requireAuth, VehiculeController.deleteVehicule);
router.get('/vehicules/client/:username', requireAuth, VehiculeController.getVehiculesByClient);
router.get('/vehicules/credit/:id_credit', requireAuth, VehiculeController.getVehiculesByCredit);

// ==================== ROUTES TRANSACTIONS ====================
router.post('/transactions/create', requireAuth, upload.single('preuve'), TransactionController.createTransaction);
router.get('/transactions/all', requireAuth, TransactionController.getAllTransactions);
router.get('/transactions/utilisateur/:id_utilisateur', requireAuth, TransactionController.getTransactionsByUser);

// ==================== ROUTES DASHBOARD ====================
router.get('/dashboard/credits/:id_utilisateur', requireAuth, CreditController.getCreditsByUser);
router.get('/dashboard/credit-stats/:id_utilisateur', requireAuth, CreditController.getCreditStats);
router.get('/dashboard/payment-stats/:id_utilisateur', requireAuth, PaimentController.getPaymentStats);
router.get('/dashboard/recent-payments/:id_utilisateur', requireAuth, PaimentController.getRecentPayments);
router.get('/dashboard/transaction-stats/:id_utilisateur', requireAuth, TransactionController.getTransactionStats);
router.get('/dashboard/recent-transactions/:id_utilisateur', requireAuth, TransactionController.getRecentTransactions);
router.get('/dashboard/client/:id_utilisateur', requireAuth, DashboardController.getClientDashboard);
router.get('/dashboard/gerant', requireAuth, DashboardController.getGerantDashboard);
router.get('/dashboard/caissier/:id_caissier', requireAuth, DashboardController.getCaissierDashboard);
// Ajoutez cette route
router.get('/dashboard/monthly-payments/:id_utilisateur', requireAuth, DashboardController.getMonthlyPayments);
export default router;