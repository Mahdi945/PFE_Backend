import xmlrpc from 'xmlrpc';
import dotenv from 'dotenv';
import { createConnection } from 'node:net';
import { URL } from 'node:url';

dotenv.config();

class OdooService {
  constructor() {
    this.odooUrl = process.env.ODOO_URL || 'http://127.0.0.1:8069';
    this.db = process.env.ODOO_DB;
    this.username = process.env.ODOO_USERNAME;
    this.password = process.env.ODOO_PASSWORD;
    
    this.commonClient = xmlrpc.createClient({
      url: `${this.odooUrl}/xmlrpc/2/common`,
      timeout: 10000,
      rejectUnauthorized: false
    });
    
    this.objectClient = xmlrpc.createClient({
      url: `${this.odooUrl}/xmlrpc/2/object`,
      timeout: 10000
    });
  }

  async authenticate() {
    return new Promise((resolve, reject) => {
      this.commonClient.methodCall('authenticate', [
        this.db,
        this.username,
        this.password,
        {}
      ], (err, uid) => {
        if (err) {
          console.error('Authentication failed:', {
            url: this.odooUrl,
            error: err.message
          });
          reject(new Error(`Échec de l'authentification: ${err.message}`));
          return;
        }
        this.uid = uid;
        resolve(uid);
      });
    });
  }

  async execute(model, method, args, kwargs = {}) {
    if (!this.uid) await this.authenticate();
    
    return new Promise((resolve, reject) => {
      this.objectClient.methodCall('execute_kw', [
        this.db,
        this.uid,
        this.password,
        model,
        method,
        args,
        kwargs
      ], (err, result) => {
        if (err) {
          console.error(`Odoo API Error [${model}.${method}]:`, err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  // ============ CATÉGORIES ============
  async getAllCategories(fields = ['id', 'name', 'parent_id', 'child_id']) {
    try {
      const ids = await this.execute('product.category', 'search', [
        [], // domaine
        0,  // offset
        0,  // limit (0 = pas de limite)
        'id', // order
        {} // context
      ]);
      return await this.execute('product.category', 'read', [ids, fields]);
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  async createCategory(data) {
    return this.execute('product.category', 'create', [data]);
  }

  // ============ PRODUITS ============
  async getAllProducts(fields = ['id', 'name', 'default_code', 'qty_available', 'list_price', 'categ_id', 'image_1920'], limit = 1000) {
    try {
      const ids = await this.execute('product.product', 'search', [
        [], // domaine
        0,  // offset
        limit, // limit
        'id', // order
        {} // context
      ]);
      return await this.execute('product.product', 'read', [ids, fields]);
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }
  async createProduct(data) {
    // Séparer l'image des autres données
    const { image, ...productData } = data;
    
    const product = {
      ...productData,
      type: 'product',
      sale_ok: true,
      purchase_ok: true,
      available_in_pos: true
    };
  
    // Créer d'abord le produit sans image
    const productId = await this.execute('product.product', 'create', [product]);
    
    // Si une image est fournie, l'uploader séparément
    if (image) {
      await this.updateProductImage(productId, image);
    }
  
    return productId;
  }
  
  // Modifiez la méthode updateProductImage
async updateProductImage(productId, imageData) {
  try {
    // Convertir productId en nombre
    const numericProductId = typeof productId === 'string' ? parseInt(productId) : productId;
    
    // Convertir l'image en base64 si nécessaire
    let imageBase64 = imageData;
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      imageBase64 = imageData.split(',')[1];
    }

    return await this.execute('product.product', 'write', [
      [numericProductId], // Tableau avec ID converti en nombre
      { image_1920: imageBase64 }
    ]);
  } catch (error) {
    console.error('Error updating product image:', error);
    throw new Error("Échec de la mise à jour de l'image du produit");
  }
}

// Modifiez également la méthode uploadProductImage pour être cohérent
async uploadProductImage(productId, imageData) {
  try {
    // Convertir productId en nombre
    const numericProductId = typeof productId === 'string' ? parseInt(productId) : productId;
    
    let base64Data = imageData;
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      base64Data = imageData.split(',')[1];
    }

    return await this.execute('product.product', 'write', [
      [numericProductId], // Tableau avec ID converti en nombre
      { image_1920: base64Data }
    ]);
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw new Error("Échec de l'upload de l'image du produit");
  }
}

// Modifiez également la méthode updateProduct
async updateProduct(id, data) {
  // Convertir l'ID en nombre
  const numericId = typeof id === 'string' ? parseInt(id) : id;
  
  // Séparer l'image des autres données
  const { image, ...productData } = data;
  
  // Mettre à jour les données du produit
  if (Object.keys(productData).length > 0) {
    await this.execute('product.product', 'write', [
      [numericId], // Tableau avec ID converti en nombre
      productData
    ]);
  }
  
  // Mettre à jour l'image si elle est fournie
  if (image) {
    await this.updateProductImage(numericId, image);
  }

  return true;
}
  
  async deleteProduct(id) {
    try {
      // Vérifier d'abord si le produit existe
      const product = await this.execute('product.product', 'read', [[id], ['id']]);
      if (!product || product.length === 0) {
        throw new Error('Produit non trouvé');
      }
      
      return await this.execute('product.product', 'unlink', [[id]]);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async getProductImage(id) {
    try {
      const products = await this.execute('product.product', 'read', [[id], ['image_1920']]);
      return products[0]?.image_1920 || null;
    } catch (error) {
      console.error('Error getting product image:', error);
      return null;
    }
  }
  // Dans la classe OdooService
async uploadProductImage(productId, imageData) {
  try {
    // Si c'est une data URL (commence par 'data:image'), on extrait la partie base64
    let base64Data = imageData;
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      base64Data = imageData.split(',')[1];
    }

    return await this.execute('product.product', 'write', [[productId], {
      image_1920: base64Data
    }]);
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw new Error("Échec de l'upload de l'image du produit");
  }
}
  // ============ STOCK ============
  async getStockQuantities(productIds = [], locationId = null) {
    try {
      const domain = [];
      if (productIds.length > 0) {
        domain.push(['product_id', 'in', productIds]);
      }
      if (locationId) {
        domain.push(['location_id', '=', locationId]);
      }
      
      const ids = await this.execute('stock.quant', 'search', [
        domain,
        0,  // offset
        0,  // limit
        'id', // order
        {} // context
      ]);
      return await this.execute('stock.quant', 'read', [
        ids, 
        ['product_id', 'quantity', 'location_id', 'reserved_quantity']
      ]);
    } catch (error) {
      console.error('Error getting stock quantities:', error);
      return [];
    }
  }

  async updateStockQuantity(productId, quantity, locationId = null) {
    try {
      const location = locationId || await this.getDefaultLocation();
      if (!location) throw new Error('Aucun emplacement de stock par défaut trouvé');

      const quants = await this.getStockQuantities([productId], location);
      
      if (quants.length > 0) {
        return this.execute('stock.quant', 'write', [
          [quants[0].id],
          { quantity: parseFloat(quantity) }
        ]);
      }
      
      return this.execute('stock.quant', 'create', [{
        product_id: productId,
        quantity: parseFloat(quantity),
        location_id: location
      }]);
    } catch (error) {
      console.error('Error updating stock quantity:', error);
      throw error;
    }
  }

  async getDefaultLocation() {
    try {
      const ids = await this.execute('stock.location', 'search', [
        [['usage', '=', 'internal']],
        0,  // offset
        1,  // limit
        'id', // order
        {} // context
      ]);
      return ids[0] || null;
    } catch (error) {
      console.error('Error getting default location:', error);
      return null;
    }
  }

  async getStockMoves(domain = [], fields = ['id', 'product_id', 'quantity_done', 'state', 'date', 'location_id', 'location_dest_id']) {
    try {
      const ids = await this.execute('stock.move', 'search', [
        domain,
        0,  // offset
        0,  // limit
        'id', // order
        {} // context
      ]);
      return await this.execute('stock.move', 'read', [ids, fields]);
    } catch (error) {
      console.error('Error getting stock moves:', error);
      return [];
    }
  }

  // ============ ALERTES DE STOCK ============
  async getLowStockProducts(minQty = 5) {
    try {
      const numericMinQty = typeof minQty === 'string' ? parseFloat(minQty) : minQty;
      const ids = await this.execute('product.product', 'search', [
        [['qty_available', '<', numericMinQty]],
        0,  // offset
        0,  // limit
        'id', // order
        {} // context
      ]);
      return await this.execute('product.product', 'read', [
        ids,
        ['id', 'name', 'qty_available', 'default_code']
      ]);
    } catch (error) {
      console.error('Error getting low stock products:', error);
      return [];
    }
  }

  async setProductAlertThreshold(productId, minQty) {
    try {
      const numericMinQty = typeof minQty === 'string' ? parseFloat(minQty) : minQty;
      return this.execute('product.product', 'write', [
        [productId],
        { sale_min_qty: numericMinQty }
      ]);
    } catch (error) {
      console.error('Error setting alert threshold:', error);
      throw error;
    }
  }

  // ============ VENTES ============
  async createSaleOrder(customerId, orderLines) {
    try {
      const lines = orderLines.map(line => ({
        product_id: line.productId,
        product_uom_qty: parseFloat(line.quantity),
        price_unit: parseFloat(line.price) || 0,
        name: line.description || `Produit ${line.productId}`
      }));

      return this.execute('sale.order', 'create', [{
        partner_id: customerId,
        order_line: lines.map(line => [0, 0, line])
      }]);
    } catch (error) {
      console.error('Error creating sale order:', error);
      throw error;
    }
  }

  async confirmSaleOrder(orderId) {
    return this.execute('sale.order', 'action_confirm', [[orderId]]);
  }

  // ============ COMMANDES FOURNISSEUR ============
  async createPurchaseOrder(vendorId, orderLines) {
    try {
      const lines = orderLines.map(line => ({
        product_id: line.productId,
        product_qty: parseFloat(line.quantity),
        price_unit: parseFloat(line.price) || 0,
        name: line.description || `Produit ${line.productId}`
      }));

      return this.execute('purchase.order', 'create', [{
        partner_id: vendorId,
        order_line: lines.map(line => [0, 0, line])
      }]);
    } catch (error) {
      console.error('Error creating purchase order:', error);
      throw error;
    }
  }

  async confirmPurchaseOrder(orderId) {
    return this.execute('purchase.order', 'button_confirm', [[orderId]]);
  }

  async getVendors(fields = ['id', 'name', 'email']) {
    try {
      const ids = await this.execute('res.partner', 'search', [
        [['supplier_rank', '>', 0]],
        0,  // offset
        0,  // limit
        'id', // order
        {} // context
      ]);
      return await this.execute('res.partner', 'read', [ids, fields]);
    } catch (error) {
      console.error('Error getting vendors:', error);
      return [];
    }
  }

  // ============ UTILITAIRES ============
  async testConnection() {
    try {
      await this._checkPortAvailability();
      const uid = await this.authenticate();
      const version = await this.getVersionInfo();
      
      return {
        success: true,
        uid,
        version,
        db: this.db,
        message: 'Connexion Odoo établie avec succès'
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
        details: this._getConnectionSuggestion(err)
      };
    }
  }

  async getVersionInfo() {
    return new Promise((resolve, reject) => {
      this.commonClient.methodCall('version', [], (err, result) => {
        if (err) reject(new Error('Could not retrieve Odoo version'));
        else resolve(result);
      });
    });
  }

  async _checkPortAvailability() {
    const url = new URL(this.odooUrl);
    const port = url.port || 8069;
    const host = url.hostname;
    
    return new Promise((resolve, reject) => {
      const socket = createConnection({ port, host }, () => {
        socket.end();
        resolve();
      });
      
      socket.on('error', (err) => {
        reject(new Error(`Cannot connect to ${host}:${port} - ${err.message}`));
      });
      
      socket.setTimeout(3000, () => {
        socket.destroy();
        reject(new Error(`Connection timeout to ${host}:${port}`));
      });
    });
  }

  _getConnectionSuggestion(err) {
    if (err.message.includes('ECONNREFUSED')) {
      return 'Vérifiez que: 1) Odoo est en cours d\'exécution, 2) Le port 8069 est accessible, 3) Le firewall n\'est pas bloquant';
    }
    if (err.message.includes('Timeout')) {
      return 'Le serveur Odoo met trop de temps à répondre. Vérifiez la charge du serveur.';
    }
    if (err.message.includes('authenticate')) {
      return 'Vérifiez vos identifiants Odoo (username/password) et les permissions de l\'utilisateur';
    }
    return 'Consultez les logs Odoo pour plus de détails';
  }
}

const odooServiceInstance = new OdooService();
export default odooServiceInstance;