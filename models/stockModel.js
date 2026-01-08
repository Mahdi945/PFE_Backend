import db from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===================================================================
//  MODÈLE STOCK - Gestion complète du système de stock
// ===================================================================
const Stock = {
  // ==================== PRODUITS ====================

  // Crée un nouveau produit avec upload d'image optionnel
  createProduit: async (produitData, imagePath = null) => {
    // Validation des champs obligatoires
    if (
      !produitData.code_barre ||
      !produitData.nom ||
      produitData.prix_achat === undefined ||
      produitData.prix_vente === undefined
    ) {
      throw new Error('Champs obligatoires manquants');
    }

    const query = `
      INSERT INTO produits 
      (code_barre, nom, description, categorie_id, fournisseur_id, prix_achat, prix_vente, 
       quantite_stock, seuil_alerte, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      produitData.code_barre,
      produitData.nom,
      produitData.description || null,
      produitData.categorie_id || null,
      produitData.fournisseur_id || null,
      produitData.prix_achat,
      produitData.prix_vente,
      produitData.quantite_stock || 0,
      produitData.seuil_alerte || null,
      imagePath,
    ];

    const [result] = await db.execute(query, values);
    return { id: result.insertId, ...produitData, image_url: imagePath };
  },

  // Met à jour un produit existant avec gestion d'image
  updateProduit: async (id, produitData, imagePath = null) => {
    // Validation des champs obligatoires
    if (
      !produitData.code_barre ||
      !produitData.nom ||
      !produitData.categorie_id ||
      produitData.prix_achat === undefined ||
      produitData.prix_vente === undefined
    ) {
      throw new Error('Champs obligatoires manquants');
    }

    // Si nouvelle image, on supprime l'ancienne
    if (imagePath) {
      const [produit] = await db.execute('SELECT image_url FROM produits WHERE id = ?', [id]);
      if (produit[0]?.image_url) {
        const filename = path.basename(produit[0].image_url);
        const oldImagePath = path.join(__dirname, '../public/images_produits', filename);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const query = `
      UPDATE produits SET
        code_barre = ?,
        nom = ?,
        description = ?,
        categorie_id = ?,
        fournisseur_id = ?,
        prix_achat = ?,
        prix_vente = ?,
        quantite_stock = ?,
        seuil_alerte = ?,
        image_url = COALESCE(?, image_url)
      WHERE id = ?
    `;
    const values = [
      produitData.code_barre,
      produitData.nom,
      produitData.description || null,
      produitData.categorie_id,
      produitData.fournisseur_id || null,
      produitData.prix_achat,
      produitData.prix_vente,
      produitData.quantite_stock || 0,
      produitData.seuil_alerte || null,
      imagePath,
      id,
    ];
    await db.execute(query, values);
    return { id, ...produitData, image_url: imagePath || produitData.image_url };
  },

  // Supprime un produit et son image associée
  deleteProduit: async id => {
    // Suppression de l'image associée
    const [produit] = await db.execute('SELECT image_url FROM produits WHERE id = ?', [id]);
    if (produit[0]?.image_url) {
      const imagePath = path.join(__dirname, '../public/images_produits', produit[0].image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await db.execute('DELETE FROM produits WHERE id = ?', [id]);
    return { id };
  },

  // Récupère un produit par son ID avec informations fournisseur
  getProduitById: async id => {
    const [produit] = await db.execute(
      `
      SELECT p.*, f.nom as fournisseur_nom 
      FROM produits p 
      LEFT JOIN fournisseurs f ON p.fournisseur_id = f.id 
      WHERE p.id = ?
    `,
      [id]
    );
    return produit[0] || null;
  },

  // Récupère tous les produits avec informations fournisseur
  getAllProduits: async () => {
    const [produits] = await db.execute(`
      SELECT p.*, f.nom as fournisseur_nom 
      FROM produits p 
      LEFT JOIN fournisseurs f ON p.fournisseur_id = f.id 
      ORDER BY p.nom
    `);
    return produits;
  },

  // Récupère les produits avec stock faible pour alertes
  getProduitsLowStock: async () => {
    const [produits] = await db.execute(`
      SELECT p.*, f.nom as fournisseur_nom 
      FROM produits p 
      LEFT JOIN fournisseurs f ON p.fournisseur_id = f.id 
      WHERE p.quantite_stock <= p.seuil_alerte 
      ORDER BY p.quantite_stock ASC
    `);
    return produits;
  },

  // ==================== CATÉGORIES ====================

  // Crée une nouvelle catégorie de produits
  createCategorie: async categorieData => {
    if (!categorieData.nom) {
      throw new Error('Le nom de la catégorie est obligatoire');
    }

    const query = `
      INSERT INTO categories 
      (nom, description, parent_id)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      categorieData.nom,
      categorieData.description || null,
      categorieData.parent_id || null,
    ]);
    return { id: result.insertId, ...categorieData };
  },

  // Met à jour les informations d'une catégorie
  updateCategorie: async (id, categorieData) => {
    if (!categorieData.nom) {
      throw new Error('Le nom de la catégorie est obligatoire');
    }

    const query = `
      UPDATE categories SET
        nom = ?,
        description = ?,
        parent_id = ?
      WHERE id = ?
    `;
    await db.execute(query, [
      categorieData.nom,
      categorieData.description || null,
      categorieData.parent_id || null,
      id,
    ]);
    return { id, ...categorieData };
  },

  // Supprime une catégorie de produits
  deleteCategorie: async id => {
    await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    return { id };
  },

  // Récupère une catégorie par son ID
  getCategorieById: async id => {
    const [categorie] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return categorie[0] || null;
  },

  // Récupère toutes les catégories triées par nom
  getAllCategories: async () => {
    const [categories] = await db.execute('SELECT * FROM categories ORDER BY nom');
    return categories;
  },

  // ==================== MOUVEMENTS STOCK ====================

  // Enregistre un mouvement de stock (entrée/sortie)
  createMouvement: async mouvementData => {
    if (!mouvementData.produit_id || !mouvementData.type || mouvementData.quantite === undefined) {
      throw new Error('produit_id, type et quantite sont obligatoires');
    }

    const query = `
        INSERT INTO mouvements_stock 
        (produit_id, type, quantite, agent_id, raison)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      mouvementData.produit_id,
      mouvementData.type,
      mouvementData.quantite,
      mouvementData.agent_id || null,
      mouvementData.raison || null,
    ];

    const [result] = await db.execute(query, values);

    return { id: result.insertId, ...mouvementData };
  },

  // Récupère l'historique des mouvements pour un produit
  getMouvementsByProduit: async produitId => {
    const [mouvements] = await db.execute(
      `
      SELECT 
        m.*, 
        p.nom AS produit_nom,
        u.username AS agent_username
      FROM mouvements_stock m
      JOIN produits p ON m.produit_id = p.id
      LEFT JOIN utilisateurs u ON m.agent_id = u.id
      WHERE m.produit_id = ?
      ORDER BY m.date_mouvement DESC
    `,
      [produitId]
    );
    return mouvements;
  },

  // Récupère les mouvements sur une période donnée
  getMouvementsByDate: async (startDate, endDate) => {
    const [mouvements] = await db.execute(
      `
      SELECT 
        m.*, 
        p.nom AS produit_nom,
        u.username AS agent_username
      FROM mouvements_stock m
      JOIN produits p ON m.produit_id = p.id
      LEFT JOIN utilisateurs u ON m.agent_id = u.id
      WHERE m.date_mouvement BETWEEN ? AND ?
      ORDER BY m.date_mouvement DESC
    `,
      [startDate, endDate]
    );
    return mouvements;
  },

  // ==================== VENTES ====================

  // Enregistre une nouvelle vente avec gestion du stock
  createVente: async venteData => {
    if (
      !venteData.montant_total ||
      !venteData.montant_paye ||
      !venteData.mode_paiement ||
      !venteData.produits_vendus ||
      !Array.isArray(venteData.produits_vendus)
    ) {
      throw new Error('Données de vente incomplètes');
    }

    // Obtenir une connexion spécifique du pool
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // 1. Créer l'en-tête de vente
      const [resultVente] = await conn.execute(
        `INSERT INTO ventes 
        (montant_total, montant_paye, mode_paiement, id_caissier)
        VALUES (?, ?, ?, ?)`,
        [
          venteData.montant_total,
          venteData.montant_paye,
          venteData.mode_paiement,
          venteData.id_caissier || null,
        ]
      );

      const venteId = resultVente.insertId;

      // 2. Ajouter les lignes de vente et gérer le stock
      for (const produit of venteData.produits_vendus) {
        if (!produit.id || produit.quantite === undefined || produit.prix_unitaire === undefined) {
          throw new Error('Données produit invalides');
        }

        // Vérifier le stock disponible
        const [rows] = await conn.execute('SELECT quantite_stock FROM produits WHERE id = ?', [
          produit.id,
        ]);

        if (rows.length === 0) {
          throw new Error(`Produit ${produit.id} non trouvé`);
        }

        const stockDisponible = rows[0].quantite_stock;
        if (stockDisponible < produit.quantite) {
          throw new Error(`Stock insuffisant pour le produit ${produit.id}`);
        }

        // Ajouter la ligne de vente
        await conn.execute(
          `INSERT INTO ligne_vente 
          (vente_id, produit_id, quantite, prix_unitaire)
          VALUES (?, ?, ?, ?)`,
          [venteId, produit.id, produit.quantite, produit.prix_unitaire]
        );

        // Mettre à jour le stock
        await conn.execute('UPDATE produits SET quantite_stock = quantite_stock - ? WHERE id = ?', [
          produit.quantite,
          produit.id,
        ]);

        // Enregistrer le mouvement de stock
        await conn.execute(
          `INSERT INTO mouvements_stock 
          (produit_id, type, quantite, agent_id, raison)
          VALUES (?, 'SORTIE', ?, ?, ?)`,
          [produit.id, produit.quantite, venteData.id_caissier || null, `Vente #${venteId}`]
        );
      }

      await conn.commit();

      // Libérer la connexion
      conn.release();

      // Récupérer la vente complète avec la monnaie calculée
      return await Stock.getVenteById(venteId);
    } catch (err) {
      // Annuler la transaction en cas d'erreur
      if (conn) {
        await conn.rollback();
        conn.release();
      }
      throw err;
    }
  },

  // Récupère une vente par son ID avec détails produits
  getVenteById: async id => {
    const [ventes] = await db.execute('SELECT * FROM ventes WHERE id = ?', [id]);
    if (ventes.length === 0) return null;

    const [lignes] = await db.execute(
      `SELECT lv.*, p.nom as produit_nom, p.code_barre 
       FROM ligne_vente lv
       JOIN produits p ON lv.produit_id = p.id
       WHERE lv.vente_id = ?`,
      [id]
    );

    return {
      ...ventes[0],
      produits_vendus: lignes.map(l => ({
        id: l.produit_id,
        nom: l.produit_nom,
        code_barre: l.code_barre,
        quantite: l.quantite,
        prix_unitaire: l.prix_unitaire,
      })),
    };
  },

  // Récupère les ventes sur une période donnée
  getVentesByDate: async (startDate, endDate) => {
    const [ventes] = await db.execute(
      `SELECT v.*, u.username as caissier_nom
       FROM ventes v
       LEFT JOIN utilisateurs u ON v.id_caissier = u.id
       WHERE v.date_vente BETWEEN ? AND ?
       ORDER BY v.date_vente DESC`,
      [startDate, endDate]
    );

    // Récupérer les lignes pour chaque vente
    for (const vente of ventes) {
      const [lignes] = await db.execute(
        `SELECT lv.*, p.nom as produit_nom 
         FROM ligne_vente lv
         JOIN produits p ON lv.produit_id = p.id
         WHERE vente_id = ?`,
        [vente.id]
      );
      vente.produits_vendus = lignes;
    }

    return ventes;
  },

  // Récupère les ventes d'un caissier spécifique
  getVentesByCaissier: async (caissierId, startDate, endDate) => {
    const [ventes] = await db.execute(
      `SELECT v.*, u.username as caissier_nom
       FROM ventes v
       LEFT JOIN utilisateurs u ON v.id_caissier = u.id
       WHERE v.id_caissier = ?
       AND v.date_vente BETWEEN ? AND ?
       ORDER BY v.date_vente DESC`,
      [caissierId, startDate, endDate]
    );

    // Récupérer les lignes pour chaque vente
    for (const vente of ventes) {
      const [lignes] = await db.execute(
        `SELECT lv.*, p.nom as produit_nom 
         FROM ligne_vente lv
         JOIN produits p ON lv.produit_id = p.id
         WHERE vente_id = ?`,
        [vente.id]
      );
      vente.produits_vendus = lignes;
    }

    return ventes;
  },

  // Annule une vente et restaure le stock
  cancelVente: async id => {
    const vente = await Stock.getVenteById(id);
    if (!vente) throw new Error('Vente non trouvée');

    await db.beginTransaction();

    try {
      // Restaurer le stock pour chaque produit
      for (const produit of vente.produits_vendus) {
        await db.execute('UPDATE produits SET quantite_stock = quantite_stock + ? WHERE id = ?', [
          produit.quantite,
          produit.id,
        ]);

        // Enregistrer l'annulation
        await db.execute(
          `INSERT INTO mouvements_stock 
          (produit_id, type, quantite, agent_id, raison)
          VALUES (?, 'AJUSTEMENT', ?, ?, ?)`,
          [produit.id, produit.quantite, vente.id_caissier || null, `Annulation vente #${id}`]
        );
      }

      // Supprimer les lignes
      await db.execute('DELETE FROM ligne_vente WHERE vente_id = ?', [id]);

      // Supprimer la vente
      await db.execute('DELETE FROM ventes WHERE id = ?', [id]);

      await db.commit();
      return { id, annule: true };
    } catch (err) {
      await db.rollback();
      throw err;
    }
  },

  // ==================== FOURNISSEURS ====================

  // Crée un nouveau fournisseur avec informations de contact
  createFournisseur: async fournisseurData => {
    if (!fournisseurData.nom) {
      throw new Error('Le nom du fournisseur est obligatoire');
    }

    const query = `
      INSERT INTO fournisseurs 
      (nom, contact, telephone, email, adresse)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      fournisseurData.nom,
      fournisseurData.contact || null,
      fournisseurData.telephone || null,
      fournisseurData.email || null,
      fournisseurData.adresse || null,
    ]);
    return { id: result.insertId, ...fournisseurData };
  },

  // Met à jour les informations d'un fournisseur
  updateFournisseur: async (id, fournisseurData) => {
    if (!fournisseurData.nom) {
      throw new Error('Le nom du fournisseur est obligatoire');
    }

    const query = `
      UPDATE fournisseurs 
      SET nom = ?, contact = ?, telephone = ?, email = ?, adresse = ?
      WHERE id = ?
    `;
    await db.execute(query, [
      fournisseurData.nom,
      fournisseurData.contact || null,
      fournisseurData.telephone || null,
      fournisseurData.email || null,
      fournisseurData.adresse || null,
      id,
    ]);
    return { id: parseInt(id), ...fournisseurData };
  },

  // Supprime un fournisseur avec vérification des contraintes
  deleteFournisseur: async id => {
    // Vérifier s'il y a des commandes associées à ce fournisseur
    const [commandes] = await db.execute(
      'SELECT COUNT(*) as count FROM commandes_achat WHERE fournisseur_id = ?',
      [id]
    );
    if (commandes[0].count > 0) {
      throw new Error('Impossible de supprimer un fournisseur avec des commandes associées');
    }

    const [result] = await db.execute('DELETE FROM fournisseurs WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error('Fournisseur non trouvé');
    }
    return { id: parseInt(id), deleted: true };
  },

  // Récupère un fournisseur par son ID
  getFournisseurById: async id => {
    const [fournisseurs] = await db.execute('SELECT * FROM fournisseurs WHERE id = ?', [id]);
    return fournisseurs[0] || null;
  },

  // Récupère tous les fournisseurs avec statistiques
  getAllFournisseurs: async () => {
    const [fournisseurs] = await db.execute(`
      SELECT f.*, 
             COUNT(ca.id) as nb_commandes,
             COALESCE(SUM(ca.montant_total), 0) as total_commandes
      FROM fournisseurs f
      LEFT JOIN commandes_achat ca ON f.id = ca.fournisseur_id
      GROUP BY f.id
      ORDER BY f.nom
    `);
    return fournisseurs;
  },

  // ==================== COMMANDES ACHAT ====================

  // Crée une nouvelle commande d'achat
  createCommandeAchat: async commandeData => {
    if (
      !commandeData.fournisseur_id ||
      !commandeData.produits ||
      !Array.isArray(commandeData.produits)
    ) {
      throw new Error('fournisseur_id et produits sont obligatoires');
    }

    if (commandeData.produits.length === 0) {
      throw new Error('Au moins un produit doit être commandé');
    }

    // Calculer le montant total
    let montantTotal = 0;
    for (const produit of commandeData.produits) {
      if (!produit.produit_id || !produit.quantite || !produit.prix_unitaire) {
        throw new Error('Chaque produit doit avoir un produit_id, quantite et prix_unitaire');
      }
      montantTotal += produit.quantite * produit.prix_unitaire;
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // 1. Créer l'en-tête de commande
      const [resultCommande] = await conn.execute(
        `INSERT INTO commandes_achat 
        (fournisseur_id, date_commande, montant_total, statut, agent_id)
        VALUES (?, NOW(), ?, 'brouillon', ?)`,
        [commandeData.fournisseur_id, montantTotal, commandeData.agent_id || null]
      );

      const commandeId = resultCommande.insertId;

      // 2. Ajouter les lignes de commande
      for (const produit of commandeData.produits) {
        await conn.execute(
          `INSERT INTO ligne_commande 
          (commande_id, produit_id, quantite, prix_unitaire)
          VALUES (?, ?, ?, ?)`,
          [commandeId, produit.produit_id, produit.quantite, produit.prix_unitaire]
        );
      }

      await conn.commit();
      conn.release();

      return await Stock.getCommandeAchatById(commandeId);
    } catch (err) {
      if (conn) {
        await conn.rollback();
        conn.release();
      }
      throw err;
    }
  },

  // Met à jour une commande d'achat existante
  updateCommandeAchat: async (id, commandeData) => {
    const commande = await Stock.getCommandeAchatById(id);
    if (!commande) {
      throw new Error('Commande non trouvée');
    }

    if (commande.statut === 'reçue' || commande.statut === 'annulée') {
      throw new Error('Impossible de modifier une commande reçue ou annulée');
    }

    if (!commandeData.produits || !Array.isArray(commandeData.produits)) {
      throw new Error('produits est obligatoire et doit être un tableau');
    }

    // Calculer le nouveau montant total
    let montantTotal = 0;
    for (const produit of commandeData.produits) {
      if (!produit.produit_id || !produit.quantite || !produit.prix_unitaire) {
        throw new Error('Chaque produit doit avoir un produit_id, quantite et prix_unitaire');
      }
      montantTotal += produit.quantite * produit.prix_unitaire;
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // 1. Mettre à jour l'en-tête
      await conn.execute(
        `UPDATE commandes_achat 
        SET fournisseur_id = ?, montant_total = ?, agent_id = ?
        WHERE id = ?`,
        [
          commandeData.fournisseur_id || commande.fournisseur_id,
          montantTotal,
          commandeData.agent_id || commande.agent_id,
          id,
        ]
      );

      // 2. Supprimer les anciennes lignes
      await conn.execute('DELETE FROM ligne_commande WHERE commande_id = ?', [id]);

      // 3. Ajouter les nouvelles lignes
      for (const produit of commandeData.produits) {
        await conn.execute(
          `INSERT INTO ligne_commande 
          (commande_id, produit_id, quantite, prix_unitaire)
          VALUES (?, ?, ?, ?)`,
          [id, produit.produit_id, produit.quantite, produit.prix_unitaire]
        );
      }

      await conn.commit();
      conn.release();

      return await Stock.getCommandeAchatById(id);
    } catch (err) {
      if (conn) {
        await conn.rollback();
        conn.release();
      }
      throw err;
    }
  },

  // Supprime une commande d'achat
  deleteCommandeAchat: async id => {
    const commande = await Stock.getCommandeAchatById(id);
    if (!commande) {
      throw new Error('Commande non trouvée');
    }

    if (commande.statut === 'reçue') {
      throw new Error('Impossible de supprimer une commande déjà reçue');
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // Supprimer les lignes de commande
      await conn.execute('DELETE FROM ligne_commande WHERE commande_id = ?', [id]);

      // Supprimer la commande
      await conn.execute('DELETE FROM commandes_achat WHERE id = ?', [id]);

      await conn.commit();
      conn.release();

      return { id: parseInt(id), deleted: true };
    } catch (err) {
      if (conn) {
        await conn.rollback();
        conn.release();
      }
      throw err;
    }
  },

  // Récupère une commande d'achat par son ID
  getCommandeAchatById: async id => {
    const [commandes] = await db.execute(
      `
      SELECT ca.*, f.nom as fournisseur_nom, u.username as agent_nom
      FROM commandes_achat ca
      JOIN fournisseurs f ON ca.fournisseur_id = f.id
      LEFT JOIN utilisateurs u ON ca.agent_id = u.id
      WHERE ca.id = ?
    `,
      [id]
    );

    if (commandes.length === 0) return null;

    const [lignes] = await db.execute(
      `
      SELECT lc.*, p.nom as produit_nom, p.code_barre
      FROM ligne_commande lc
      JOIN produits p ON lc.produit_id = p.id
      WHERE lc.commande_id = ?
    `,
      [id]
    );

    return {
      ...commandes[0],
      produits: lignes.map(l => ({
        id: l.produit_id,
        nom: l.produit_nom,
        code_barre: l.code_barre,
        quantite: l.quantite,
        prix_unitaire: l.prix_unitaire,
      })),
    };
  },

  // Récupère toutes les commandes d'achat avec filtres
  getAllCommandesAchat: async (filters = {}) => {
    let query = `
      SELECT ca.*, f.nom as fournisseur_nom, u.username as agent_nom
      FROM commandes_achat ca
      JOIN fournisseurs f ON ca.fournisseur_id = f.id
      LEFT JOIN utilisateurs u ON ca.agent_id = u.id
    `;

    const conditions = [];
    const params = [];

    if (filters.fournisseur_id) {
      conditions.push('ca.fournisseur_id = ?');
      params.push(filters.fournisseur_id);
    }

    if (filters.statut) {
      conditions.push('ca.statut = ?');
      params.push(filters.statut);
    }

    if (filters.startDate && filters.endDate) {
      conditions.push('DATE(ca.date_commande) BETWEEN ? AND ?');
      params.push(filters.startDate, filters.endDate);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY ca.date_commande DESC';

    const [commandes] = await db.execute(query, params);

    // Récupérer les produits pour chaque commande
    for (const commande of commandes) {
      const [lignes] = await db.execute(
        `
        SELECT lc.*, p.nom as produit_nom, p.code_barre
        FROM ligne_commande lc
        JOIN produits p ON lc.produit_id = p.id
        WHERE lc.commande_id = ?
      `,
        [commande.id]
      );

      commande.produits = lignes;
    }

    return commandes;
  },

  // Valide une commande d'achat en brouillon
  validerCommandeAchat: async (id, agentId) => {
    const commande = await Stock.getCommandeAchatById(id);
    if (!commande) {
      throw new Error('Commande non trouvée');
    }

    if (commande.statut !== 'brouillon') {
      throw new Error('Seules les commandes en brouillon peuvent être validées');
    }

    await db.execute('UPDATE commandes_achat SET statut = ?, agent_id = ? WHERE id = ?', [
      'validée',
      agentId,
      id,
    ]);

    return await Stock.getCommandeAchatById(id);
  },

  // Réceptionne une commande validée et met à jour le stock
  recevoirCommandeAchat: async (id, agentId, receptionData) => {
    const commande = await Stock.getCommandeAchatById(id);
    if (!commande) {
      throw new Error('Commande non trouvée');
    }

    if (commande.statut !== 'validée') {
      throw new Error('Seules les commandes validées peuvent être reçues');
    }

    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // 1. Marquer la commande comme reçue
      await conn.execute('UPDATE commandes_achat SET statut = ?, agent_id = ? WHERE id = ?', [
        'reçue',
        agentId,
        id,
      ]);

      // 2. Mettre à jour le stock pour chaque produit
      for (const produit of commande.produits) {
        const quantiteRecue =
          receptionData && receptionData[produit.id] ? receptionData[produit.id] : produit.quantite;

        // Mettre à jour le stock
        await conn.execute('UPDATE produits SET quantite_stock = quantite_stock + ? WHERE id = ?', [
          quantiteRecue,
          produit.id,
        ]);

        // Enregistrer le mouvement de stock
        await conn.execute(
          `INSERT INTO mouvements_stock 
          (produit_id, type, quantite, agent_id, raison)
          VALUES (?, 'ENTREE', ?, ?, ?)`,
          [produit.id, quantiteRecue, agentId, `Réception commande #${id}`]
        );
      }

      await conn.commit();
      conn.release();

      return await Stock.getCommandeAchatById(id);
    } catch (err) {
      if (conn) {
        await conn.rollback();
        conn.release();
      }
      throw err;
    }
  },

  // Annule une commande d'achat
  annulerCommandeAchat: async (id, agentId) => {
    const commande = await Stock.getCommandeAchatById(id);
    if (!commande) {
      throw new Error('Commande non trouvée');
    }

    if (commande.statut === 'reçue') {
      throw new Error("Impossible d'annuler une commande déjà reçue");
    }

    await db.execute('UPDATE commandes_achat SET statut = ?, agent_id = ? WHERE id = ?', [
      'annulée',
      agentId,
      id,
    ]);

    return await Stock.getCommandeAchatById(id);
  },

  // Récupère les commandes d'un fournisseur spécifique
  getCommandesAchatByFournisseur: async (fournisseurId, filters = {}) => {
    let query = `
      SELECT ca.*, f.nom as fournisseur_nom, u.username as agent_nom
      FROM commandes_achat ca
      JOIN fournisseurs f ON ca.fournisseur_id = f.id
      LEFT JOIN utilisateurs u ON ca.agent_id = u.id
      WHERE ca.fournisseur_id = ?
    `;

    const params = [fournisseurId];

    if (filters.statut) {
      query += ' AND ca.statut = ?';
      params.push(filters.statut);
    }

    if (filters.startDate && filters.endDate) {
      query += ' AND DATE(ca.date_commande) BETWEEN ? AND ?';
      params.push(filters.startDate, filters.endDate);
    }

    query += ' ORDER BY ca.date_commande DESC';

    const [commandes] = await db.execute(query, params);

    // Récupérer les produits pour chaque commande
    for (const commande of commandes) {
      const [lignes] = await db.execute(
        `
        SELECT lc.*, p.nom as produit_nom, p.code_barre
        FROM ligne_commande lc
        JOIN produits p ON lc.produit_id = p.id
        WHERE lc.commande_id = ?
      `,
        [commande.id]
      );

      commande.produits = lignes;
    }

    return commandes;
  },

  // Génère les statistiques des commandes d'achat
  getStatsCommandesAchat: async (startDate, endDate) => {
    const [stats] = await db.execute(
      `
      SELECT 
        COUNT(*) as total_commandes,
        COUNT(CASE WHEN statut = 'brouillon' THEN 1 END) as commandes_brouillon,
        COUNT(CASE WHEN statut = 'validée' THEN 1 END) as commandes_validees,
        COUNT(CASE WHEN statut = 'reçue' THEN 1 END) as commandes_recues,
        COUNT(CASE WHEN statut = 'annulée' THEN 1 END) as commandes_annulees,
        COALESCE(SUM(montant_total), 0) as montant_total_commandes,
        COALESCE(SUM(CASE WHEN statut = 'reçue' THEN montant_total ELSE 0 END), 0) as montant_commandes_recues
      FROM commandes_achat
      WHERE DATE(date_commande) BETWEEN ? AND ?
    `,
      [startDate, endDate]
    );

    // Top fournisseurs par montant
    const [topFournisseurs] = await db.execute(
      `
      SELECT 
        f.nom as fournisseur_nom,
        COUNT(ca.id) as nb_commandes,
        COALESCE(SUM(ca.montant_total), 0) as montant_total
      FROM fournisseurs f
      LEFT JOIN commandes_achat ca ON f.id = ca.fournisseur_id 
        AND DATE(ca.date_commande) BETWEEN ? AND ?
      GROUP BY f.id, f.nom
      HAVING nb_commandes > 0
      ORDER BY montant_total DESC
      LIMIT 5
    `,
      [startDate, endDate]
    );

    return {
      ...stats[0],
      top_fournisseurs: topFournisseurs,
    };
  },

  // ==================== STATISTIQUES ====================
  // Génère les statistiques complètes du stock
  getStockStats: async () => {
    // Statistiques de base du stock
    const [baseStats] = await db.execute(`
        SELECT 
            COUNT(*) AS total_produits,
            SUM(quantite_stock) AS total_stock,
            SUM(prix_achat * quantite_stock) AS valeur_stock,
            SUM(CASE WHEN quantite_stock <= seuil_alerte THEN 1 ELSE 0 END) AS produits_alerte
        FROM produits
    `);

    // Ventes du jour
    const today = new Date().toISOString().split('T')[0];
    const [todaySales] = await db.execute(
      `
        SELECT 
            COUNT(*) AS todaySalesCount,
            SUM(montant_total) AS todaySalesAmount
        FROM ventes
        WHERE DATE(date_vente) = ?
    `,
      [today]
    );

    // Ventes des 7 derniers jours
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const sevenDaysAgo = date.toISOString().split('T')[0];

    const [last7DaysSales] = await db.execute(
      `
        SELECT 
            DATE(date_vente) AS sale_date,
            SUM(montant_total) AS daily_amount
        FROM ventes
        WHERE DATE(date_vente) BETWEEN ? AND ?
        GROUP BY DATE(date_vente)
        ORDER BY sale_date ASC
    `,
      [sevenDaysAgo, today]
    );
    // Dans votre modèle getStockStats()
    const [todayMovements] = await db.execute(
      `
    SELECT 
        m.*,
        p.nom AS produit_nom,
        u.username AS agent_nom
    FROM mouvements_stock m
    JOIN produits p ON m.produit_id = p.id
    LEFT JOIN utilisateurs u ON m.agent_id = u.id
    WHERE DATE(m.date_mouvement) = ?
    ORDER BY m.date_mouvement DESC
`,
      [today]
    );
    // Top 5 produits vendus
    const [topProducts] = await db.execute(`
        SELECT 
            p.nom AS product_name,
            SUM(lv.quantite) AS total_quantity
        FROM ligne_vente lv
        JOIN produits p ON lv.produit_id = p.id
        GROUP BY p.id, p.nom
        ORDER BY total_quantity DESC
        LIMIT 5
    `);

    // Produits en alerte de stock
    const [lowStockProducts] = await db.execute(`
        SELECT 
            p.*,
            c.nom AS categorie_nom
        FROM produits p
        LEFT JOIN categories c ON p.categorie_id = c.id
        WHERE p.quantite_stock <= p.seuil_alerte
    `);

    return {
      // Stats de base
      ...baseStats[0],

      // Ventes aujourd'hui
      todaySalesCount: todaySales[0]?.todaySalesCount || 0,
      todaySalesAmount: todaySales[0]?.todaySalesAmount || 0,

      // Ventes 7 derniers jours
      last7DaysLabels: last7DaysSales.map(sale => {
        const date = new Date(sale.sale_date);
        return date.toLocaleDateString('fr-FR', { weekday: 'short' });
      }),
      last7DaysData: last7DaysSales.map(sale => sale.daily_amount),

      // Top produits
      topProductsLabels: topProducts.map(product => product.product_name),
      topProductsData: topProducts.map(product => product.total_quantity),

      // Produits en alerte
      lowStockProductsList: lowStockProducts,
      todayMovements: todayMovements,
    };
  },

  // Génère les statistiques des ventes pour une période donnée
  getVentesStats: async (startDate, endDate) => {
    const [stats] = await db.execute(
      `
      SELECT 
        COUNT(*) AS nombre_ventes,
        SUM(montant_total) AS chiffre_affaires,
        mode_paiement,
        COUNT(DISTINCT id_caissier) AS nombre_caissiers
      FROM ventes
      WHERE date_vente BETWEEN ? AND ?
      GROUP BY mode_paiement
    `,
      [startDate, endDate]
    );
    return stats;
  },
};

export default Stock;
