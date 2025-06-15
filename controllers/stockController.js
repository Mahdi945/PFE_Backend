import Stock from '../models/stockModel.js';
import dotenv from 'dotenv';

dotenv.config();
const stockController = {
  // ==================== PRODUITS ====================

  /**
   * Crée un nouveau produit dans le système
   * Gère l'upload d'image et la validation des données
   */
  createProduit: async (req, res) => {
    try {
      // Validation des données
      if (
        !req.body.code_barre ||
        !req.body.nom ||
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

  /**
   * Met à jour un produit existant
   * Permet la modification des informations et de l'image
   */
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

  /**
   * Supprime un produit du système
   * @param {Object} req - Requête Express contenant l'ID du produit dans les paramètres
   * @param {Object} res - Réponse Express
   * @returns {Object} Confirmation de suppression
   */
  deleteProduit: async (req, res) => {
    try {
      const result = await Stock.deleteProduit(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère un produit spécifique par son ID
   */
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

  /**
   * Récupère la liste complète de tous les produits
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @returns {Array} Liste de tous les produits avec leurs informations
   */
  getAllProduits: async (req, res) => {
    try {
      const produits = await Stock.getAllProduits();
      res.json(produits);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère les produits ayant un stock faible (en rupture ou presque)
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @returns {Array} Liste des produits avec stock faible
   */
  getLowStockProduits: async (req, res) => {
    try {
      const produits = await Stock.getProduitsLowStock();
      res.json(produits);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== CATÉGORIES ====================
  /**
   * Crée une nouvelle catégorie de produits
   */
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

  /**
   * Met à jour une catégorie existante
   */
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

  /**
   * Supprime une catégorie du système
   */
  deleteCategorie: async (req, res) => {
    try {
      const result = await Stock.deleteCategorie(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère une catégorie spécifique par son ID
   */
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

  /**
   * Récupère toutes les catégories disponibles
   */
  getAllCategories: async (req, res) => {
    try {
      const categories = await Stock.getAllCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== MOUVEMENTS STOCK ====================
  /**
   * Crée un nouveau mouvement de stock (entrée/sortie)
   */
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

  /**
   * Récupère l'historique des mouvements pour un produit spécifique
   * @param {Object} req - Requête Express contenant l'ID du produit
   * @param {Object} res - Réponse Express
   * @returns {Array} Liste des mouvements du produit
   */
  getMouvementsByProduit: async (req, res) => {
    try {
      const mouvements = await Stock.getMouvementsByProduit(req.params.produitId);
      res.json(mouvements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère les mouvements de stock dans une période donnée
   */
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
  /**
   * Enregistre une nouvelle vente avec les produits vendus
   * Met à jour automatiquement le stock des produits vendus
   */
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

  /**
   * Récupère les détails d'une vente spécifique
   */
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

  /**
   * Récupère les ventes effectuées dans une période donnée
   */
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

  /**
   * Récupère les ventes effectuées par un caissier spécifique
   */
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

  /**
   * Annule une vente et restaure le stock des produits
   */
  cancelVente: async (req, res) => {
    try {
      const result = await Stock.cancelVente(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== FOURNISSEURS ====================
  /**
   * Crée un nouveau fournisseur dans le système
   */
  createFournisseur: async (req, res) => {
    try {
      if (!req.body.nom) {
        return res.status(400).json({ error: 'Le nom du fournisseur est obligatoire' });
      }

      const fournisseur = await Stock.createFournisseur(req.body);
      res.status(201).json(fournisseur);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Met à jour les informations d'un fournisseur
   */
  updateFournisseur: async (req, res) => {
    try {
      if (!req.body.nom) {
        return res.status(400).json({ error: 'Le nom du fournisseur est obligatoire' });
      }

      const fournisseur = await Stock.updateFournisseur(req.params.id, req.body);
      res.json(fournisseur);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Supprime un fournisseur du système
   */
  deleteFournisseur: async (req, res) => {
    try {
      const result = await Stock.deleteFournisseur(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère les informations d'un fournisseur spécifique
   */
  getFournisseur: async (req, res) => {
    try {
      const fournisseur = await Stock.getFournisseurById(req.params.id);
      if (!fournisseur) {
        return res.status(404).json({ error: 'Fournisseur non trouvé' });
      }
      res.json(fournisseur);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère la liste de tous les fournisseurs
   */
  getAllFournisseurs: async (req, res) => {
    try {
      const fournisseurs = await Stock.getAllFournisseurs();
      res.json(fournisseurs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== COMMANDES ACHAT ====================
  /**
   * Crée une nouvelle commande d'achat auprès d'un fournisseur
   */
  createCommandeAchat: async (req, res) => {
    try {
      if (!req.body.fournisseur_id || !req.body.produits || !Array.isArray(req.body.produits)) {
        return res.status(400).json({ error: 'fournisseur_id et produits sont obligatoires' });
      }

      if (req.body.produits.length === 0) {
        return res.status(400).json({ error: 'Au moins un produit doit être commandé' });
      }

      // Validation des produits
      for (const produit of req.body.produits) {
        if (!produit.produit_id || !produit.quantite || !produit.prix_unitaire) {
          return res.status(400).json({
            error: 'Chaque produit doit avoir un produit_id, quantite et prix_unitaire',
          });
        }
      }

      const commande = await Stock.createCommandeAchat({
        ...req.body,
        agent_id: req.body.agent_id || null,
      });
      res.status(201).json(commande);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Met à jour une commande d'achat existante
   */
  updateCommandeAchat: async (req, res) => {
    try {
      if (!req.body.produits || !Array.isArray(req.body.produits)) {
        return res.status(400).json({ error: 'produits est obligatoire et doit être un tableau' });
      }

      // Validation des produits
      for (const produit of req.body.produits) {
        if (!produit.produit_id || !produit.quantite || !produit.prix_unitaire) {
          return res.status(400).json({
            error: 'Chaque produit doit avoir un produit_id, quantite et prix_unitaire',
          });
        }
      }

      const commande = await Stock.updateCommandeAchat(req.params.id, req.body);
      res.json(commande);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Supprime une commande d'achat du système
   */
  deleteCommandeAchat: async (req, res) => {
    try {
      const result = await Stock.deleteCommandeAchat(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère les détails d'une commande d'achat spécifique
   */
  getCommandeAchat: async (req, res) => {
    try {
      const commande = await Stock.getCommandeAchatById(req.params.id);
      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.json(commande);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère toutes les commandes d'achat avec filtres optionnels
   */
  getAllCommandesAchat: async (req, res) => {
    try {
      const filters = {
        fournisseur_id: req.query.fournisseur_id,
        statut: req.query.statut,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      };

      const commandes = await Stock.getAllCommandesAchat(filters);
      res.json(commandes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Valide une commande d'achat (change son statut à "validée")
   */
  validerCommandeAchat: async (req, res) => {
    try {
      const commande = await Stock.validerCommandeAchat(req.params.id, req.body.agent_id);
      res.json(commande);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Marque une commande d'achat comme reçue et met à jour le stock
   */
  recevoirCommandeAchat: async (req, res) => {
    try {
      const commande = await Stock.recevoirCommandeAchat(
        req.params.id,
        req.body.agent_id,
        req.body.reception_data
      );
      res.json(commande);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Annule une commande d'achat

   */
  annulerCommandeAchat: async (req, res) => {
    try {
      const commande = await Stock.annulerCommandeAchat(req.params.id, req.body.agent_id);
      res.json(commande);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère les commandes d'achat d'un fournisseur spécifique
   */
  getCommandesAchatByFournisseur: async (req, res) => {
    try {
      const filters = {
        statut: req.query.statut,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      };

      const commandes = await Stock.getCommandesAchatByFournisseur(
        req.params.fournisseurId,
        filters
      );
      res.json(commandes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère les statistiques des commandes d'achat sur une période
   */
  getStatsCommandesAchat: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate et endDate sont requis' });
      }

      const stats = await Stock.getStatsCommandesAchat(startDate, endDate);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ==================== STATISTIQUES ====================
  /**
   * Récupère les statistiques générales du stock
   */
  getStockStats: async (req, res) => {
    try {
      const stats = await Stock.getStockStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère les statistiques des ventes sur une période donnée
   */
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
