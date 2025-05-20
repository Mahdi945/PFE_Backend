import db from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const Stock = {
  // ==================== PRODUITS ====================
  createProduit: async (produitData, imagePath = null) => {
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

    const query = `
      INSERT INTO produits 
      (code_barre, nom, description, categorie_id, prix_achat, prix_vente, 
       quantite_stock, seuil_alerte, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      produitData.code_barre,
      produitData.nom,
      produitData.description || null,
      produitData.categorie_id,
      produitData.prix_achat,
      produitData.prix_vente,
      produitData.quantite_stock || 0,
      produitData.seuil_alerte || null,
      imagePath,
    ];

    const [result] = await db.execute(query, values);
    return { id: result.insertId, ...produitData, image_url: imagePath };
  },

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

  deleteProduit: async (id) => {
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

  getProduitById: async (id) => {
    const [produit] = await db.execute('SELECT * FROM produits WHERE id = ?', [id]);
    return produit[0] || null;
  },

  getAllProduits: async () => {
    const [produits] = await db.execute('SELECT * FROM produits ORDER BY nom');
    return produits;
  },

  getProduitsLowStock: async () => {
    const [produits] = await db.execute(`
      SELECT * FROM produits 
      WHERE quantite_stock <= seuil_alerte 
      ORDER BY quantite_stock ASC
    `);
    return produits;
  },

  // ==================== CATÉGORIES ====================
  createCategorie: async (categorieData) => {
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

  deleteCategorie: async (id) => {
    await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    return { id };
  },

  getCategorieById: async (id) => {
    const [categorie] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return categorie[0] || null;
  },

  getAllCategories: async () => {
    const [categories] = await db.execute('SELECT * FROM categories ORDER BY nom');
    return categories;
  },

  // ==================== MOUVEMENTS STOCK ====================
  createMouvement: async (mouvementData) => {
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

  getMouvementsByProduit: async (produitId) => {
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
      [produitId],
    );
    return mouvements;
  },

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
      [startDate, endDate],
    );
    return mouvements;
  },

  // ==================== VENTES ====================
  // ==================== VENTES ====================
  createVente: async (venteData) => {
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
        ],
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
          [venteId, produit.id, produit.quantite, produit.prix_unitaire],
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
          [produit.id, produit.quantite, venteData.id_caissier || null, `Vente #${venteId}`],
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

  getVenteById: async (id) => {
    const [ventes] = await db.execute('SELECT * FROM ventes WHERE id = ?', [id]);
    if (ventes.length === 0) return null;

    const [lignes] = await db.execute(
      `SELECT lv.*, p.nom as produit_nom, p.code_barre 
       FROM ligne_vente lv
       JOIN produits p ON lv.produit_id = p.id
       WHERE lv.vente_id = ?`,
      [id],
    );

    return {
      ...ventes[0],
      produits_vendus: lignes.map((l) => ({
        id: l.produit_id,
        nom: l.produit_nom,
        code_barre: l.code_barre,
        quantite: l.quantite,
        prix_unitaire: l.prix_unitaire,
      })),
    };
  },

  getVentesByDate: async (startDate, endDate) => {
    const [ventes] = await db.execute(
      `SELECT v.*, u.username as caissier_nom
       FROM ventes v
       LEFT JOIN utilisateurs u ON v.id_caissier = u.id
       WHERE v.date_vente BETWEEN ? AND ?
       ORDER BY v.date_vente DESC`,
      [startDate, endDate],
    );

    // Récupérer les lignes pour chaque vente
    for (const vente of ventes) {
      const [lignes] = await db.execute(
        `SELECT lv.*, p.nom as produit_nom 
         FROM ligne_vente lv
         JOIN produits p ON lv.produit_id = p.id
         WHERE vente_id = ?`,
        [vente.id],
      );
      vente.produits_vendus = lignes;
    }

    return ventes;
  },

  getVentesByCaissier: async (caissierId, startDate, endDate) => {
    const [ventes] = await db.execute(
      `SELECT v.*, u.username as caissier_nom
       FROM ventes v
       LEFT JOIN utilisateurs u ON v.id_caissier = u.id
       WHERE v.id_caissier = ?
       AND v.date_vente BETWEEN ? AND ?
       ORDER BY v.date_vente DESC`,
      [caissierId, startDate, endDate],
    );

    // Récupérer les lignes pour chaque vente
    for (const vente of ventes) {
      const [lignes] = await db.execute(
        `SELECT lv.*, p.nom as produit_nom 
         FROM ligne_vente lv
         JOIN produits p ON lv.produit_id = p.id
         WHERE vente_id = ?`,
        [vente.id],
      );
      vente.produits_vendus = lignes;
    }

    return ventes;
  },

  cancelVente: async (id) => {
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
          [produit.id, produit.quantite, vente.id_caissier || null, `Annulation vente #${id}`],
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

  // ==================== STATISTIQUES ====================
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
      [today],
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
      [sevenDaysAgo, today],
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
      [today],
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
      last7DaysLabels: last7DaysSales.map((sale) => {
        const date = new Date(sale.sale_date);
        return date.toLocaleDateString('fr-FR', { weekday: 'short' });
      }),
      last7DaysData: last7DaysSales.map((sale) => sale.daily_amount),

      // Top produits
      topProductsLabels: topProducts.map((product) => product.product_name),
      topProductsData: topProducts.map((product) => product.total_quantity),

      // Produits en alerte
      lowStockProductsList: lowStockProducts,
      todayMovements: todayMovements,
    };
  },

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
      [startDate, endDate],
    );
    return stats;
  },
};

export default Stock;
