import odooService from '../services/OdooService.js';

class OdooController {
  // ============ CATÉGORIES ============
  async getAllCategories(req, res) {
    try {
      const categories = await odooService.getAllCategories();
      res.json({ success: true, categories });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createCategory(req, res) {
    try {
      const categoryId = await odooService.createCategory(req.body);
      res.json({ success: true, categoryId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ PRODUITS ============
  async getAllProducts(req, res) {
    try {
      const products = await odooService.getAllProducts();
      res.json({ success: true, products });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  async createProduct(req, res) {
    try {
      const productId = await odooService.createProduct(req.body);
      res.json({ 
        success: true, 
        productId,
        message: 'Produit créé avec succès'
      });
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ 
        success: false, 
        error: err.message || 'Erreur lors de la création du produit'
      });
    }
  }
  
  async updateProduct(req, res) {
    try {
      const result = await odooService.updateProduct(req.params.id, req.body);
      res.json({ 
        success: true, 
        result,
        message: 'Produit mis à jour avec succès'
      });
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ 
        success: false, 
        error: err.message || 'Erreur lors de la mise à jour du produit'
      });
    }
  }
  
  async deleteProduct(req, res) {
    try {
      const result = await odooService.deleteProduct(req.params.id);
      res.json({ 
        success: true, 
        result,
        message: 'Produit supprimé avec succès'
      });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ 
        success: false, 
        error: err.message || 'Erreur lors de la suppression du produit'
      });
    }
  }
  async getProductImage(req, res) {
    try {
      const image = await odooService.getProductImage(req.params.id);
      if (image) {
        const imgBuffer = Buffer.from(image, 'base64');
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': imgBuffer.length
        });
        res.end(imgBuffer);
      } else {
        res.status(404).json({ success: false, error: 'Image non trouvée' });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  // Dans la classe OdooController
async uploadProductImage(req, res) {
  try {
    const { productId } = req.params;
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ 
        success: false, 
        error: 'Aucune image fournie' 
      });
    }

    const result = await odooService.uploadProductImage(productId, image);
    res.json({ 
      success: true, 
      result,
      message: 'Image du produit mise à jour avec succès'
    });
  } catch (err) {
    console.error('Error uploading product image:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Erreur lors de l\'upload de l\'image du produit'
    });
  }
}
  // ============ STOCK ============
  async getStock(req, res) {
    try {
      const stock = await odooService.getStockQuantities(
        req.query.product_ids ? JSON.parse(req.query.product_ids) : [],
        req.query.location_id || null
      );
      res.json({ success: true, stock });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async updateStock(req, res) {
    try {
      const { product_id, quantity, location_id } = req.body;
      const result = await odooService.updateStockQuantity(product_id, quantity, location_id);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getStockMoves(req, res) {
    try {
      const moves = await odooService.getStockMoves(
        req.query.domain ? JSON.parse(req.query.domain) : []
      );
      res.json({ success: true, moves });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ ALERTES DE STOCK ============
  async getLowStock(req, res) {
    try {
      const minQty = req.query.min_qty || 5;
      const products = await odooService.getLowStockProducts(minQty);
      res.json({ success: true, products });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async setAlertThreshold(req, res) {
    try {
      const { product_id, min_qty } = req.body;
      const result = await odooService.setProductAlertThreshold(product_id, min_qty);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ VENTES ============
  async createSale(req, res) {
    try {
      const { customer_id, products } = req.body;
      const orderId = await odooService.createSaleOrder(customer_id, products);
      res.json({ success: true, orderId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async confirmSale(req, res) {
    try {
      const result = await odooService.confirmSaleOrder(req.params.id);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============ COMMANDES FOURNISSEUR ============
  async getVendors(req, res) {
    try {
      const vendors = await odooService.getVendors();
      res.json({ success: true, vendors });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createPurchase(req, res) {
    try {
      const { vendor_id, products } = req.body;
      const orderId = await odooService.createPurchaseOrder(vendor_id, products);
      res.json({ success: true, orderId });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async confirmPurchase(req, res) {
    try {
      const result = await odooService.confirmPurchaseOrder(req.params.id);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default new OdooController();