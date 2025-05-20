import Stock from '../models/stockModel.js';
import dotenv from 'dotenv';

dotenv.config();
const stockController = {
  // ==================== PRODUITS ====================
  createProduit: async (req, res) => {
    try {
      // Validation des données
      if (
        !req.body.code_barre ||
        !req.body.nom ||
        !req.body.categorie_id ||
        req.body.prix_achat === undefined ||
        req.body.prix_vente === undefined
      ) {
        return res.status(400).json({ error: 'Champs obligatoires manquants' });
      }

      const imagePath = req.file
        ? `${process.env.BASE_URL}/images_produits/${req.file.filename}`
        : null;
      const produit = await Stock.createProduit(req.body, imagePath);
      res.status(201).json(produit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProduit: async (req, res) => {
    try {
      // Validation des données
      if (
        !req.body.code_barre ||
        !req.body.nom ||
        !req.body.categorie_id ||
        req.body.prix_achat === undefined ||
        req.body.prix_vente === undefined
      ) {
        return res.status(400).json({ error: 'Champs obligatoires manquants' });
      }

      const imagePath = req.file
        ? `${process.env.BASE_URL}/images_produits/${req.file.filename}`
        : null;
      const produit = await Stock.updateProduit(req.params.id, req.body, imagePath);
      res.json(produit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteProduit: async (req, res) => {
    try {
      const result = await Stock.deleteProduit(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProduit: async (req, res) => {
    try {
      const produit = await Stock.getProduitById(req.params.id);
      if (!produit) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
      res.json(produit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllProduits: async (req, res) => {
    try {
      const produits = await Stock.getAllProduits();
      res.json(produits);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getLowStockProduits: async (req, res) => {
    try {
      const produits = await Stock.getProduitsLowStock();
      res.json(produits);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== CATÉGORIES ====================
  createCategorie: async (req, res) => {
    try {
      if (!req.body.nom) {
        return res.status(400).json({ error: 'Le nom de la catégorie est obligatoire' });
      }

      const categorie = await Stock.createCategorie(req.body);
      res.status(201).json(categorie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateCategorie: async (req, res) => {
    try {
      if (!req.body.nom) {
        return res.status(400).json({ error: 'Le nom de la catégorie est obligatoire' });
      }

      const categorie = await Stock.updateCategorie(req.params.id, req.body);
      res.json(categorie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteCategorie: async (req, res) => {
    try {
      const result = await Stock.deleteCategorie(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getCategorie: async (req, res) => {
    try {
      const categorie = await Stock.getCategorieById(req.params.id);
      if (!categorie) {
        return res.status(404).json({ error: 'Catégorie non trouvée' });
      }
      res.json(categorie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await Stock.getAllCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== MOUVEMENTS STOCK ====================
  createMouvement: async (req, res) => {
    try {
      if (!req.body.produit_id || !req.body.type || req.body.quantite === undefined) {
        return res.status(400).json({ error: 'produit_id, type et quantite sont obligatoires' });
      }

      const mouvement = await Stock.createMouvement({
        produit_id: req.body.produit_id,
        type: req.body.type,
        quantite: req.body.quantite,
        agent_id: req.body.agent_id || null,
        raison: req.body.raison || null,
      });

      res.status(201).json(mouvement);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getMouvementsByProduit: async (req, res) => {
    try {
      const mouvements = await Stock.getMouvementsByProduit(req.params.produitId);
      res.json(mouvements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getMouvementsByDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate et endDate sont requis' });
      }

      const mouvements = await Stock.getMouvementsByDate(startDate, endDate);
      res.json(mouvements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== VENTES ====================
  createVente: async (req, res) => {
    try {
      if (
        !req.body.montant_total ||
        !req.body.montant_paye ||
        !req.body.mode_paiement ||
        !req.body.produits_vendus ||
        !Array.isArray(req.body.produits_vendus)
      ) {
        return res.status(400).json({ error: 'Données de vente incomplètes' });
      }

      // Validation des produits
      for (const produit of req.body.produits_vendus) {
        if (!produit.id || produit.quantite === undefined || produit.prix_unitaire === undefined) {
          return res.status(400).json({ error: 'Données produit invalides' });
        }
      }

      const vente = await Stock.createVente({
        ...req.body,
        id_caissier: req.body.id_caissier, // On utilise directement l'ID envoyé || null
      });

      res.status(201).json(vente);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getVente: async (req, res) => {
    try {
      const vente = await Stock.getVenteById(req.params.id);
      if (!vente) {
        return res.status(404).json({ error: 'Vente non trouvée' });
      }
      res.json(vente);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getVentesByDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Dates requises' });
      }

      const ventes = await Stock.getVentesByDate(startDate, endDate);
      res.json(ventes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getVentesByCaissier: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Dates requises' });
      }

      const ventes = await Stock.getVentesByCaissier(req.params.caissierId, startDate, endDate);
      res.json(ventes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  cancelVente: async (req, res) => {
    try {
      const result = await Stock.cancelVente(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== STATISTIQUES ====================
  getStockStats: async (req, res) => {
    try {
      const stats = await Stock.getStockStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getVentesStats: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate et endDate sont requis' });
      }

      const stats = await Stock.getVentesStats(startDate, endDate);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default stockController;
