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
    if (!produitData.code_barre || !produitData.nom || !produitData.categorie_id || 
        produitData.prix_achat === undefined || produitData.prix_vente === undefined) {
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
      imagePath
    ];

    const [result] = await db.execute(query, values);
    return { id: result.insertId, ...produitData, image_url: imagePath };
  },

  updateProduit: async (id, produitData, imagePath = null) => {
  // Validation des champs obligatoires
    if (!produitData.code_barre || !produitData.nom || !produitData.categorie_id || 
        produitData.prix_achat === undefined || produitData.prix_vente === undefined) {
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
      id
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
      categorieData.parent_id || null
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
      id
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
      mouvementData.raison || null
    ];

    const [result] = await db.execute(query, values);
    
    // Mise à jour du stock si nécessaire
    if (mouvementData.type === 'ENTREE' || mouvementData.type === 'SORTIE' || mouvementData.type === 'AJUSTEMENT') {
      const operation = mouvementData.type === 'ENTREE' ? '+' : '-';
      await db.execute(
        `UPDATE produits SET quantite_stock = quantite_stock ${operation} ? WHERE id = ?`,
        [mouvementData.quantite, mouvementData.produit_id]
      );
    }
    
    return { id: result.insertId, ...mouvementData };
  },

  getMouvementsByProduit: async (produitId) => {
    const [mouvements] = await db.execute(`
      SELECT m.*, p.nom AS produit_nom
      FROM mouvements_stock m
      JOIN produits p ON m.produit_id = p.id
      WHERE m.produit_id = ?
      ORDER BY m.date_mouvement DESC
    `, [produitId]);
    return mouvements;
  },

  getMouvementsByDate: async (startDate, endDate) => {
    const [mouvements] = await db.execute(`
      SELECT m.*, p.nom AS produit_nom
      FROM mouvements_stock m
      JOIN produits p ON m.produit_id = p.id
      WHERE m.date_mouvement BETWEEN ? AND ?
      ORDER BY m.date_mouvement DESC
    `, [startDate, endDate]);
    return mouvements;
  },

  // ==================== VENTES ====================
  createVente: async (venteData) => {
    if (!venteData.montant_total || !venteData.montant_paye || !venteData.mode_paiement || 
        !venteData.produits_vendus || !Array.isArray(venteData.produits_vendus)) {
      throw new Error('Données de vente incomplètes');
    }

    await db.beginTransaction();

    try {
      // 1. Créer la vente
      const queryVente = `
        INSERT INTO ventes 
        (montant_total, montant_paye, mode_paiement, id_caissier, produits_vendus)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [resultVente] = await db.execute(queryVente, [
        venteData.montant_total,
        venteData.montant_paye,
        venteData.mode_paiement,
        venteData.id_caissier || null,
        JSON.stringify(venteData.produits_vendus)
      ]);

      // 2. Traiter chaque produit vendu
      for (const produit of venteData.produits_vendus) {
        // Vérification des données du produit
        if (!produit.id || produit.quantite === undefined) {
          throw new Error('Données produit invalides');
        }

        // Mise à jour du stock
        await db.execute(
          'UPDATE produits SET quantite_stock = quantite_stock - ? WHERE id = ?',
          [produit.quantite, produit.id]
        );

        // Enregistrement du mouvement de sortie
        await db.execute(
          'INSERT INTO mouvements_stock (produit_id, type, quantite, agent_id, raison) VALUES (?, ?, ?, ?, ?)',
          [
            produit.id,
            'SORTIE',
            produit.quantite,
            venteData.id_caissier || null,
            `Vente #${resultVente.insertId}`
          ]
        );
      }

      await db.commit();
      return { id: resultVente.insertId, ...venteData };
    } catch (err) {
      await db.rollback();
      throw err;
    }
  },

  getVenteById: async (id) => {
    const [vente] = await db.execute('SELECT * FROM ventes WHERE id = ?', [id]);
    if (vente.length === 0) return null;
    
    const venteObj = vente[0];
    venteObj.produits_vendus = JSON.parse(venteObj.produits_vendus);
    return venteObj;
  },

  getVentesByDate: async (startDate, endDate) => {
    const [ventes] = await db.execute(`
      SELECT v.*
      FROM ventes v
      WHERE v.date_vente BETWEEN ? AND ?
      ORDER BY v.date_vente DESC
    `, [startDate, endDate]);
    
    return ventes.map(v => {
      v.produits_vendus = JSON.parse(v.produits_vendus);
      return v;
    });
  },

  getVentesByCaissier: async (caissierId, startDate, endDate) => {
    const [ventes] = await db.execute(`
      SELECT v.*
      FROM ventes v
      WHERE v.id_caissier = ? 
      AND v.date_vente BETWEEN ? AND ?
      ORDER BY v.date_vente DESC
    `, [caissierId, startDate, endDate]);
    
    return ventes.map(v => {
      v.produits_vendus = JSON.parse(v.produits_vendus);
      return v;
    });
  },

  cancelVente: async (id) => {
    const [vente] = await db.execute('SELECT * FROM ventes WHERE id = ?', [id]);
    if (vente.length === 0) {
      throw new Error('Vente non trouvée');
    }

    await db.beginTransaction();

    try {
      const produitsVendus = JSON.parse(vente[0].produits_vendus);
      
      for (const produit of produitsVendus) {
        await db.execute(
          'UPDATE produits SET quantite_stock = quantite_stock + ? WHERE id = ?',
          [produit.quantite, produit.id]
        );

        await db.execute(
          'INSERT INTO mouvements_stock (produit_id, type, quantite, agent_id, raison) VALUES (?, ?, ?, ?, ?)',
          [
            produit.id,
            'AJUSTEMENT',
            produit.quantite,
            vente[0].id_caissier || null,
            `Annulation vente #${id}`
          ]
        );
      }

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
    const [stats] = await db.execute(`
      SELECT 
        COUNT(*) AS total_produits,
        SUM(quantite_stock) AS total_stock,
        SUM(prix_achat * quantite_stock) AS valeur_stock,
        SUM(CASE WHEN quantite_stock <= seuil_alerte THEN 1 ELSE 0 END) AS produits_alerte
      FROM produits
    `);
    return stats[0];
  },

  getVentesStats: async (startDate, endDate) => {
    const [stats] = await db.execute(`
      SELECT 
        COUNT(*) AS nombre_ventes,
        SUM(montant_total) AS chiffre_affaires,
        mode_paiement,
        COUNT(DISTINCT id_caissier) AS nombre_caissiers
      FROM ventes
      WHERE date_vente BETWEEN ? AND ?
      GROUP BY mode_paiement
    `, [startDate, endDate]);
    return stats;
  }
};

export default Stock;