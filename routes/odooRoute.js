import express from 'express';
import odooController from '../controllers/OdooController.js';
import passport from '../config/passport.js';
import cors from 'cors';

const router = express.Router();


// ============ CATÉGORIES ============
router.get('/categories', odooController.getAllCategories);
router.post('/categories', passport.authenticate('jwt', { session: false }), odooController.createCategory);

// ============ PRODUITS ============
router.get('/products', odooController.getAllProducts);
router.get('/products/:id/image', odooController.getProductImage);
router.post('/products', passport.authenticate('jwt', { session: false }),odooController.createProduct);
router.put('/products/:id', passport.authenticate('jwt', { session: false }), odooController.updateProduct);
router.delete('/products/:id', passport.authenticate('jwt', { session: false }), odooController.deleteProduct);
// Ajoutez cette ligne avec les autres routes produits
router.post('/products/:id/upload-image', passport.authenticate('jwt', { session: false }), odooController.uploadProductImage);
// ============ STOCK ============
router.get('/stock', odooController.getStock);
router.post('/stock', passport.authenticate('jwt', { session: false }), odooController.updateStock);
router.get('/stock/moves', odooController.getStockMoves);
router.get('/stock/alerts', odooController.getLowStock);
router.post('/stock/alerts', passport.authenticate('jwt', { session: false }), odooController.setAlertThreshold);

// ============ VENTES ============
router.post('/sales', passport.authenticate('jwt', { session: false }), odooController.createSale);
router.post('/sales/:id/confirm', passport.authenticate('jwt', { session: false }), odooController.confirmSale);

// ============ COMMANDES FOURNISSEUR ============
router.get('/vendors', odooController.getVendors);
router.post('/purchases', passport.authenticate('jwt', { session: false }), odooController.createPurchase);
router.post('/purchases/:id/confirm', passport.authenticate('jwt', { session: false }), odooController.confirmPurchase);

export default router;