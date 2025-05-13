import odooService from '../services/OdooService.js';

class OdooController {
  // ============ TEST CONNEXION ============
  async testConnection(req, res) {
    try {
      const result = await odooService.testConnection();
      res.json(result);
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }

  // ============ PRODUITS ============
  async createProduct(req, res) {
    try {
      const productId = await odooService.createProduct(req.body);
      res.json({ success: true, productId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await odooService.getProduct(req.params.id);
      res.json({ success: true, product });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async searchProducts(req, res) {
    try {
      const products = await odooService.searchProducts(req.body.domain, req.body.fields, req.body.limit);
      res.json({ success: true, products });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ CATÉGORIES ============
  async createCategory(req, res) {
    try {
      const { name, parent_id } = req.body;
      const categoryId = await odooService.createCategory(name, parent_id);
      res.json({ success: true, categoryId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await odooService.getCategories();
      res.json({ success: true, categories });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ STOCK ============
  async updateStock(req, res) {
    try {
      const { product_id, quantity, location_id } = req.body;
      const result = await odooService.updateStock(product_id, quantity, location_id);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ PARTENAIRES ============
  async createPartner(req, res) {
    try {
      const partnerId = await odooService.createPartner(req.body);
      res.json({ success: true, partnerId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getPartners(req, res) {
    try {
      const partners = await odooService.getPartners();
      res.json({ success: true, partners });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ COMMANDES ============
  async createPurchaseOrder(req, res) {
    try {
      const { vendor_id, order_lines } = req.body;
      const orderId = await odooService.createPurchaseOrder(vendor_id, order_lines);
      res.json({ success: true, orderId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async confirmPurchase(req, res) {
    try {
      const result = await odooService.confirmPurchase(req.params.id);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default new OdooController();