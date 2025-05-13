import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class OdooService {
  constructor() {
    this.validateConfig();
    
    this.api = axios.create({
      baseURL: process.env.ODOO_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ODOO_API_KEY}`
      }
    });

    this.sessionInfo = null;
    console.log('✅ Configuration Odoo REST API chargée');
  }

  validateConfig() {
    const requiredVars = [
      'ODOO_URL', 'ODOO_DB', 
      'ODOO_USER', 'ODOO_PASSWORD',
      'ODOO_API_KEY'
    ];
    
    const missingVars = requiredVars.filter(varName => {
      if (!process.env[varName]) {
        console.error(`Variable manquante: ${varName}`);
        return true;
      }
      return false;
    });

    if (missingVars.length > 0) {
      throw new Error(`Variables d'environnement manquantes: ${missingVars.join(', ')}`);
    }

    if (!process.env.ODOO_URL.startsWith('http')) {
      throw new Error('ODOO_URL doit commencer par http:// ou https://');
    }
  }

  async authenticate() {
    try {
      const response = await this.api.post('/web/session/authenticate', {
        db: process.env.ODOO_DB,
        login: process.env.ODOO_USER,
        password: process.env.ODOO_PASSWORD
      });

      if (!response.data.result.uid) {
        throw new Error('Authentification échouée');
      }

      this.sessionInfo = {
        uid: response.data.result.uid,
        session_id: response.data.result.session_id
      };

      this.api.defaults.headers.common['Cookie'] = `session_id=${this.sessionInfo.session_id}`;
      console.log('✅ Session Odoo authentifiée');
    } catch (error) {
      console.error('Erreur authentification Odoo:', error.response?.data || error.message);
      throw error;
    }
  }

  async execute(model, method, params = {}) {
    try {
      if (!this.sessionInfo) {
        await this.authenticate();
      }

      const response = await this.api.post('/web/dataset/call_kw', {
        model,
        method,
        args: params.args || [],
        kwargs: params.kwargs || {}
      });

      return response.data.result;
    } catch (error) {
      console.error(`Erreur Odoo API [${model}.${method}]:`, error.response?.data || error.message);
      throw error;
    }
  }

  // ==================== MÉTHODES UTILES ====================

  async testConnection() {
    try {
      await this.authenticate();
      const version = await this.api.get('/web/webclient/version_info');
      
      return {
        success: true,
        userId: this.sessionInfo.uid,
        version: version.data.result.server_version,
        db: process.env.ODOO_DB
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: {
          url: process.env.ODOO_URL,
          code: error.response?.status
        }
      };
    }
  }

  // ==================== MÉTHODES PRODUITS ====================

  async createProduct(productData) {
    return this.execute('product.product', 'create', {
      args: [productData]
    });
  }

  async getProduct(productId, fields = ['id', 'name', 'default_code', 'categ_id', 'list_price']) {
    return this.execute('product.product', 'read', {
      args: [[productId]],
      kwargs: { fields }
    });
  }

  async searchProducts(domain = [], fields = ['id', 'name'], limit = 10) {
    return this.execute('product.product', 'search_read', {
      args: [domain],
      kwargs: { fields, limit }
    });
  }

  async updateProduct(productId, updateData) {
    return this.execute('product.product', 'write', {
      args: [[productId], updateData]
    });
  }

  // ==================== MÉTHODES STOCK ====================

  async getCategories(fields = ['id', 'name', 'parent_id'], limit = 100) {
    return this.execute('product.category', 'search_read', [[], { fields, limit }]);
  }

  async updateStock(productId, quantity, locationId = 8) {
    return this.execute('stock.quant', 'create', {
      args: [{
        product_id: productId,
        quantity: quantity,
        location_id: locationId
      }]
    });
  }

  async getStockInfo(productId, locationId = 8) {
    return this.execute('stock.quant', 'search_read', {
      args: [
        [['product_id', '=', productId], ['location_id', '=', locationId]]
      ]
    });
  }

  // ==================== MÉTHODES PARTENAIRES ====================
  async createPartner(partnerData) {
    return this.execute('res.partner', 'create', [partnerData]);
  }

  async getPartners(fields = ['id', 'name', 'email', 'phone'], limit = 100) {
    return this.execute('res.partner', 'search_read', [[], { fields, limit }]);
  }

  // ==================== MÉTHODES COMMANDES ====================
  async createPurchaseOrder(vendorId, orderLines) {
    return this.execute('purchase.order', 'create', [{
      partner_id: vendorId,
      order_line: orderLines.map(line => [0, 0, line])
    }]);
  }

  async confirmPurchaseOrder(orderId) {
    return this.execute('purchase.order', 'button_confirm', [[orderId]]);
  }

  // ==================== MÉTHODES UTILISATEURS ====================
  async getUsers(domain = [], fields = ['id', 'name', 'login'], limit = 10) {
    return this.execute('res.users', 'search_read', [domain, { fields, limit }]);
  }

  // ==================== MÉTHODES COMPTABILITÉ ====================
  async createInvoice(invoiceData) {
    return this.execute('account.move', 'create', [invoiceData]);
  }

  // ==================== MÉTHODES VENTES ====================
  async createSaleOrder(customerId, orderLines) {
    return this.execute('sale.order', 'create', [{
      partner_id: customerId,
      order_line: orderLines.map(line => [0, 0, line])
    }]);
  }
}
// Instance singleton
const odooService = new OdooService();
export default odooService;