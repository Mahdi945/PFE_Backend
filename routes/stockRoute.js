import express from 'express';
import passport from 'passport';
import StockController from '../controllers/stockController.js';
import db from '../config/db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ===================================================================
//  CONFIGURATION MULTER - Upload d'images produits sécurisé
// ===================================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Création automatique du dossier s'il n'existe pas
    const uploadDir = path.join(__dirname, '../public/images_produits');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Nom unique avec timestamp pour éviter les conflits
    const fileExt = path.extname(file.originalname);
    cb(null, `produit_${Date.now()}${fileExt}`);
  },
});

// Configuration sécurisée avec limitations de taille et type
const uploadProduitImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite 5MB pour performance
  fileFilter: (req, file, cb) => {
    // Validation stricte : images uniquement
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  },
});

const router = express.Router();
// Authentification JWT obligatoire pour toutes les routes
const requireAuth = passport.authenticate('jwt', { session: false });

// ===================================================================
//  ROUTES PRODUITS - CRUD complet avec gestion images
// ===================================================================

// Crée un nouveau produit avec upload d'image optionnel
router.post(
  '/produits',
  requireAuth,
  uploadProduitImage.single('image'),
  StockController.createProduit
);

// Met à jour un produit existant avec remplacement d'image possible
router.put(
  '/produits/:id',
  requireAuth,
  uploadProduitImage.single('image'),
  StockController.updateProduit
);

// Supprime un produit et son image associée
router.delete('/produits/:id', requireAuth, StockController.deleteProduit);

// Récupère tous les produits avec informations fournisseur
router.get('/produits', requireAuth, StockController.getAllProduits);

// Récupère les produits en stock bas pour alertes automatiques
router.get('/produits/low-stock', requireAuth, StockController.getLowStockProduits);

// Récupère un produit spécifique par ID avec détails complets
router.get('/produits/:id', requireAuth, StockController.getProduit);

// ===================================================================
//  ROUTES CATÉGORIES - Organisation hiérarchique des produits
// ===================================================================

// Crée une nouvelle catégorie avec support parent/enfant
router.post('/categories', requireAuth, StockController.createCategorie);

// Met à jour une catégorie existante
router.put('/categories/:id', requireAuth, StockController.updateCategorie);

// Supprime une catégorie (vérification produits associés)
router.delete('/categories/:id', requireAuth, StockController.deleteCategorie);

// Récupère toutes les catégories triées alphabétiquement
router.get('/categories', requireAuth, StockController.getAllCategories);

// Récupère une catégorie spécifique par ID
router.get('/categories/:id', requireAuth, StockController.getCategorie);

// ===================================================================
//   ROUTES MOUVEMENTS STOCK - Traçabilité complète
// ===================================================================

// Enregistre un mouvement de stock (entrée/sortie) avec raison
router.post('/mouvements', requireAuth, StockController.createMouvement);

// Récupère l'historique des mouvements pour un produit spécifique
router.get('/mouvements/produit/:produitId', requireAuth, StockController.getMouvementsByProduit);

// Récupère les mouvements par période avec filtrage par date
router.get('/mouvements', requireAuth, StockController.getMouvementsByDate);

// ===================================================================
//  ROUTES VENTES - Gestion des transactions de vente
// ===================================================================

// Enregistre une nouvelle vente avec ligne de détail
router.post('/ventes', requireAuth, StockController.createVente);

// Récupère une vente spécifique avec produits vendus
router.get('/ventes/:id', requireAuth, StockController.getVente);

// Récupère les ventes par période pour rapports
router.get('/ventes', requireAuth, StockController.getVentesByDate);

// Récupère les ventes d'un caissier spécifique pour suivi performance
router.get('/ventes/caissier/:caissierId', requireAuth, StockController.getVentesByCaissier);

// Annule une vente et restaure le stock (avec transaction)
router.delete('/ventes/:id/cancel', requireAuth, StockController.cancelVente);

// Nouvelle route pour les lignes de vente spécifiques
router.get('/ventes/:id/lignes', requireAuth, async (req, res) => {
  try {
    const [lignes] = await db.execute(
      `SELECT lv.*, p.nom as produit_nom, p.code_barre
       FROM ligne_vente lv
       JOIN produits p ON lv.produit_id = p.id
       WHERE lv.vente_id = ?`,
      [req.params.id]
    );
    res.json(lignes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================================
//  ROUTES FOURNISSEURS - Gestion des partenaires commerciaux
// ===================================================================

// Crée un nouveau fournisseur avec informations de contact
router.post('/fournisseurs', requireAuth, StockController.createFournisseur);

// Met à jour les informations d'un fournisseur existant
router.put('/fournisseurs/:id', requireAuth, StockController.updateFournisseur);

// Supprime un fournisseur après vérification des dépendances
router.delete('/fournisseurs/:id', requireAuth, StockController.deleteFournisseur);

// Récupère les détails complets d'un fournisseur spécifique
router.get('/fournisseurs/:id', requireAuth, StockController.getFournisseur);

// Récupère tous les fournisseurs avec statistiques commerciales
router.get('/fournisseurs', requireAuth, StockController.getAllFournisseurs);

// ===================================================================
//  ROUTES COMMANDES ACHAT - Workflow complet de commandes fournisseurs
// ===================================================================

// Crée une nouvelle commande d'achat en statut brouillon
router.post('/commandes-achat', requireAuth, StockController.createCommandeAchat);

// Modifie une commande d'achat existante (brouillon uniquement)
router.put('/commandes-achat/:id', requireAuth, StockController.updateCommandeAchat);

// Supprime une commande d'achat avec vérification du statut
router.delete('/commandes-achat/:id', requireAuth, StockController.deleteCommandeAchat);

// Récupère une commande d'achat avec détails complets
router.get('/commandes-achat/:id', requireAuth, StockController.getCommandeAchat);

// Liste toutes les commandes d'achat avec filtres disponibles
router.get('/commandes-achat', requireAuth, StockController.getAllCommandesAchat);

// ===================================================================
//  ACTIONS WORKFLOW COMMANDES - Transitions d'état contrôlées
// ===================================================================

// Valide une commande brouillon (brouillon → validée)
router.post('/commandes-achat/:id/valider', requireAuth, StockController.validerCommandeAchat);

// Réceptionne une commande validée et met à jour le stock
router.post('/commandes-achat/:id/recevoir', requireAuth, StockController.recevoirCommandeAchat);

// Annule une commande avec traçabilité complète
router.post('/commandes-achat/:id/annuler', requireAuth, StockController.annulerCommandeAchat);

// Récupère les commandes d'un fournisseur spécifique
router.get(
  '/fournisseurs/:fournisseurId/commandes',
  requireAuth,
  StockController.getCommandesAchatByFournisseur
);

// Récupère les lignes de produits d'une commande d'achat spécifique
router.get('/commandes-achat/:id/lignes', requireAuth, async (req, res) => {
  try {
    const [lignes] = await db.execute(
      `SELECT lc.*, p.nom as produit_nom, p.code_barre
       FROM ligne_commande lc
       JOIN produits p ON lc.produit_id = p.id
       WHERE lc.commande_id = ?`,
      [req.params.id]
    );
    res.json(lignes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================================
//  STATISTIQUES ET RAPPORTS - Métriques business temps réel
// ===================================================================

// Tableau de bord complet avec métriques stock temps réel
router.get('/stats/stock', requireAuth, StockController.getStockStats);

// Analyse détaillée des ventes par période et paiement
router.get('/stats/ventes', requireAuth, StockController.getVentesStats);

// Statistiques complètes des commandes d'achat par statut
router.get('/stats/commandes-achat', requireAuth, StockController.getStatsCommandesAchat);

export default router;
