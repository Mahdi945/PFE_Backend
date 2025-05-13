import express from 'express';
import odooController from '../controllers/OdooController.js';
import passport from '../config/passport.js';

const router = express.Router();

// Test connexion (sans auth pour faciliter le debug)
router.get('/test', odooController.testConnection);

// ============ PRODUITS ============
router.post('/products', 
  passport.authenticate('jwt', { session: false }), 
  odooController.createProduct
);

router.get('/products/:id', 
  passport.authenticate('jwt', { session: false }), 
  odooController.getProduct
);

router.post('/products/search', 
  passport.authenticate('jwt', { session: false }), 
  odooController.searchProducts
);

// ============ CATÉGORIES ============
router.post('/categories', 
  passport.authenticate('jwt', { session: false }), 
  odooController.createCategory
);

router.get('/categories', 
  passport.authenticate('jwt', { session: false }), 
  odooController.getCategories
);

// ============ STOCK ============
router.post('/stock', 
  passport.authenticate('jwt', { session: false }), 
  odooController.updateStock
);

// ============ PARTENAIRES ============
router.post('/partners', 
  passport.authenticate('jwt', { session: false }), 
  odooController.createPartner
);

router.get('/partners', 
  passport.authenticate('jwt', { session: false }), 
  odooController.getPartners
);

// ============ COMMANDES ============
router.post('/purchases', 
  passport.authenticate('jwt', { session: false }), 
  odooController.createPurchaseOrder
);

router.post('/purchases/:id/confirm', 
  passport.authenticate('jwt', { session: false }), 
  odooController.confirmPurchase
);

export default router;