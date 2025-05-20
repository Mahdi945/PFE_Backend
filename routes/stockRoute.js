import express from 'express';
import passport from 'passport';
import StockController from '../controllers/stockController.js';
import db from '../config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration Multer directement dans le fichier de routes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/images_produits');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, `produit_${Date.now()}${fileExt}`);
  },
});

const uploadProduitImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  },
});
const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES PRODUITS ====================
router.post(
  '/produits',
  requireAuth,
  uploadProduitImage.single('image'),
  StockController.createProduit,
);

router.put(
  '/produits/:id',
  requireAuth,
  uploadProduitImage.single('image'),
  StockController.updateProduit,
);

router.delete('/produits/:id', requireAuth, StockController.deleteProduit);

router.get('/produits', requireAuth, StockController.getAllProduits);
router.get('/produits/low-stock', requireAuth, StockController.getLowStockProduits);
router.get('/produits/:id', requireAuth, StockController.getProduit);

// ==================== ROUTES CATEGORIES ====================
router.post('/categories', requireAuth, StockController.createCategorie);

router.put('/categories/:id', requireAuth, StockController.updateCategorie);

router.delete('/categories/:id', requireAuth, StockController.deleteCategorie);

router.get('/categories', requireAuth, StockController.getAllCategories);
router.get('/categories/:id', requireAuth, StockController.getCategorie);

// ==================== ROUTES MOUVEMENTS STOCK ====================
router.post('/mouvements', requireAuth, StockController.createMouvement);

router.get('/mouvements/produit/:produitId', requireAuth, StockController.getMouvementsByProduit);
router.get('/mouvements', requireAuth, StockController.getMouvementsByDate);

// ==================== ROUTES VENTES ====================
router.post('/ventes', requireAuth, StockController.createVente);

router.get('/ventes/:id', requireAuth, StockController.getVente);
router.get('/ventes', requireAuth, StockController.getVentesByDate);
router.get('/ventes/caissier/:caissierId', requireAuth, StockController.getVentesByCaissier);
router.delete('/ventes/:id/cancel', requireAuth, StockController.cancelVente);

// Nouvelle route pour les lignes de vente spécifiques
router.get('/ventes/:id/lignes', requireAuth, async (req, res) => {
  try {
    const [lignes] = await db.execute(
      `SELECT lv.*, p.nom as produit_nom, p.code_barre
       FROM ligne_vente lv
       JOIN produits p ON lv.produit_id = p.id
       WHERE lv.vente_id = ?`,
      [req.params.id],
    );
    res.json(lignes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ROUTES STATISTIQUES ====================
router.get('/stats/stock', requireAuth, StockController.getStockStats);
router.get('/stats/ventes', requireAuth, StockController.getVentesStats);

export default router;
