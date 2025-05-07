import db from '../config/db.js';

const Pistolet = {
  // Ajouter un pistolet avec les nouveaux champs
  addPistolet: async (pompe_id, numero_pistolet, nom_produit, prix_unitaire, statut = 'disponible') => {
    const [result] = await db.query(
      `INSERT INTO pistolets 
      (pompe_id, numero_pistolet, nom_produit, prix_unitaire, statut, dernier_index) 
      VALUES (?, ?, ?, ?, ?, 0)`,
      [pompe_id, numero_pistolet, nom_produit, prix_unitaire, statut]
    );
    return result.insertId;
  },
  createRelevePoste: async (affectation_id, pistolet_id, index_ouverture, index_fermeture) => {
    await db.query('START TRANSACTION');
    
    try {
      // Vérification des relevés existants pour cette date
      const [existingReleve] = await db.query(
        `SELECT id FROM releves_postes 
         WHERE affectation_id = ? AND pistolet_id = ?
         AND DATE(date_heure_saisie) = CURDATE()`,
        [affectation_id, pistolet_id]
      );

      if (existingReleve.length > 0) {
        throw new Error('Un relevé existe déjà pour cette affectation et ce pistolet aujourd\'hui');
      }

      // Vérification de la continuité des index
      const [lastIndex] = await db.query(
        `SELECT index_fermeture FROM releves_postes 
         WHERE pistolet_id = ? 
         ORDER BY date_heure_saisie DESC LIMIT 1`,
        [pistolet_id]
      );

      if (lastIndex.length > 0) {
        const dernierIndex = parseFloat(lastIndex[0].index_fermeture);
        const nouvelIndex = parseFloat(index_ouverture);
        
        if (dernierIndex !== nouvelIndex) {
          throw new Error(`Index d'ouverture (${nouvelIndex}) ne correspond pas au dernier index de fermeture (${dernierIndex})`);
        }
      }

      // Insertion du relevé (sans pompiste_id)
      const [result] = await db.query(
        `INSERT INTO releves_postes 
        (affectation_id, pistolet_id, index_ouverture, index_fermeture, date_heure_saisie, statut) 
        VALUES (?, ?, ?, ?, NOW(), 'saisie')`,
        [affectation_id, pistolet_id, index_ouverture, index_fermeture]
      );

      // Mise à jour du dernier index
      await db.query(
        `UPDATE pistolets 
         SET dernier_index = ?, date_dernier_index = NOW() 
         WHERE id = ?`,
        [index_fermeture, pistolet_id]
      );

      await db.query('COMMIT');
      return result.insertId;
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Erreur lors de la création du relevé:', error);
      
      if (error.message.includes('existe déjà')) {
        error.code = 'RELEVE_EXISTANT';
      } else if (error.message.includes('Index d\'ouverture')) {
        error.code = 'INDEX_INCOHERENT';
      }
      
      throw error;
    }
  },

  // Ajout manuel d'un relevé (version simplifiée)
  addReleveManuel: async (affectation_id, pistolet_id, index_ouverture, index_fermeture, date_heure) => {
    await db.query('START TRANSACTION');
    
    try {
      // Vérification de la continuité des index
      const [lastIndex] = await db.query(
        `SELECT index_fermeture FROM releves_postes 
         WHERE pistolet_id = ? 
         ORDER BY date_heure_saisie DESC LIMIT 1`,
        [pistolet_id]
      );

      if (lastIndex.length > 0) {
        const dernierIndex = parseFloat(lastIndex[0].index_fermeture);
        const nouvelIndex = parseFloat(index_ouverture);
        
        if (dernierIndex !== nouvelIndex) {
          throw new Error(`Index d'ouverture (${nouvelIndex}) ne correspond pas au dernier index de fermeture (${dernierIndex})`);
        }
      }

      // Insertion du relevé manuel (sans pompiste_id)
      const [result] = await db.query(
        `INSERT INTO releves_postes 
        (affectation_id, pistolet_id, index_ouverture, index_fermeture, date_heure_saisie, statut) 
        VALUES (?, ?, ?, ?, ?, 'valide')`,
        [affectation_id, pistolet_id, index_ouverture, index_fermeture, date_heure]
      );

      // Mise à jour du dernier index
      await db.query(
        `UPDATE pistolets 
         SET dernier_index = ?, date_dernier_index = NOW() 
         WHERE id = ?`,
        [index_fermeture, pistolet_id]
      );

      await db.query('COMMIT');
      return result.insertId;
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Erreur lors de l\'ajout manuel du relevé:', error);
      throw error;
    }
  },

    addRapportJournalierManuel: async (date_rapport, pistolet_id, total_quantite, total_montant) => {
      try {
        // Vérifier si un rapport existe déjà pour cette date et ce pistolet
        //const [existingReport] = await db.query(
          //'SELECT id FROM rapports_journaliers WHERE date_rapport = ? AND pistolet_id = ?',
          //[date_rapport, pistolet_id]
        //);
    
        //if (existingReport.length > 0) {
         // throw new Error('Un rapport existe déjà pour cette date et ce pistolet');
        //}
    
        // Insérer le nouveau rapport
        const [result] = await db.query(
          `INSERT INTO rapports_journaliers 
          (date_rapport, pistolet_id, total_quantite, total_montant, nombre_postes, date_generation) 
          VALUES (?, ?, ?, ?, 1, NOW())`,
          [date_rapport, pistolet_id, total_quantite, total_montant]
        );
    
        return result.insertId;
      } catch (error) {
        console.error('Erreur lors de l\'ajout manuel du rapport:', error);
        throw error;
      }
    },
    // Générer un rapport journalier
    generateRapportJournalier: async (date) => {
      try {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          throw new Error('Format de date invalide');
        }
  
        // Supprimer les anciens rapports
        await db.query('DELETE FROM rapports_journaliers WHERE date_rapport = ?', [date]);
        
        // Générer les nouveaux rapports
        const [result] = await db.query(
          `INSERT INTO rapports_journaliers 
          (date_rapport, pistolet_id, total_quantite, total_montant, nombre_postes, date_generation)
          SELECT 
            ?,
            r.pistolet_id,
            SUM(r.index_fermeture - r.index_ouverture) AS total_quantite,
            SUM((r.index_fermeture - r.index_ouverture) * p.prix_unitaire) AS total_montant,
            COUNT(DISTINCT a.poste_id) AS nombre_postes,
            NOW()
          FROM releves_postes r
          JOIN affectations a ON r.affectation_id = a.id
          JOIN pistolets p ON r.pistolet_id = p.id
          WHERE DATE(r.date_heure_saisie) = ? 
          GROUP BY r.pistolet_id`,
          [date, date]
        );
        
        return result.affectedRows || 0;
      } catch (error) {
        console.error('Erreur lors de la génération du rapport:', error);
        throw error;
      }
    },
    getAllRevenuesJournalieres: async () => {
      const query = `
        SELECT 
          DATE(r.date_heure_saisie) as date,
          r.pistolet_id,
          p.nom_produit,
          p.prix_unitaire,
          SUM(r.index_fermeture - r.index_ouverture) AS quantite,
          SUM((r.index_fermeture - r.index_ouverture) * p.prix_unitaire) AS montant
        FROM releves_postes r
        JOIN pistolets p ON r.pistolet_id = p.id
        WHERE r.statut = 'valide'
        GROUP BY DATE(r.date_heure_saisie), r.pistolet_id
        ORDER BY date DESC
        LIMIT 30`;
      
      try {
        const [rows] = await db.query(query);
        
        // Structurer les données par produit et par date
        const result = rows.reduce((acc, row) => {
          if (!acc[row.nom_produit]) {
            acc[row.nom_produit] = [];
          }
          acc[row.nom_produit].push({
            date: row.date,
            quantite: row.quantite,
            montant: row.montant
          });
          return acc;
        }, {});
        
        return result;
      } catch (error) {
        console.error('Erreur dans getAllRevenuesJournalieres:', error);
        throw error;
      }
    },
    
    // Récupérer les revenus journaliers avec jointure via affectations
 // Version corrigée de getRevenusJournaliers
// Version mise à jour pour utiliser rapports_journaliers
getRevenusJournaliers: async (date_debut, date_fin, pistolet_id = null) => {
  let query = `
    SELECT 
      rj.date_rapport as date,
      rj.pistolet_id,
      p.nom_produit,
      p.prix_unitaire,
      r.poste_id,
      u.username as nom_pompiste,
      rj.total_quantite as quantite,
      rj.total_montant as montant,
      rj.nombre_postes
    FROM rapports_journaliers rj
    JOIN pistolets p ON rj.pistolet_id = p.id
    LEFT JOIN (
      SELECT 
        r.pistolet_id,
        DATE(r.date_heure_saisie) as date_releve,
        a.poste_id,
        a.pompiste_id
      FROM releves_postes r
      JOIN affectations a ON r.affectation_id = a.id
      WHERE r.statut = 'valide'
      GROUP BY r.pistolet_id, DATE(r.date_heure_saisie), a.poste_id, a.pompiste_id
    ) r ON rj.pistolet_id = r.pistolet_id AND rj.date_rapport = r.date_releve
    LEFT JOIN utilisateurs u ON r.pompiste_id = u.id
    WHERE rj.date_rapport BETWEEN ? AND ?`;
  
  const params = [date_debut, date_fin];
  
  if (pistolet_id) {
    query += ' AND rj.pistolet_id = ?';
    params.push(pistolet_id);
  }
  
  query += ' ORDER BY rj.date_rapport, rj.pistolet_id';
  
  try {
    const [rows] = await db.query(query, params);
    return rows;
  } catch (error) {
    console.error('Erreur dans getRevenusJournaliers:', {
      query,
      params,
      error: error.message
    });
    throw new Error('Erreur lors de la récupération des revenus journaliers');
  }
},
    // Ajoutez ces méthodes à votre modèle Pistolet

// Méthode pour récupérer les rapports journaliers avec filtres
getDailyRevenues: async (filter = {}) => {
  let query = `
    SELECT 
      rj.date_rapport as date,
      rj.pistolet_id,
      p.nom_produit,
      p.prix_unitaire,
      rj.total_quantite as quantite,
      rj.total_montant as montant,
      rj.nombre_postes
    FROM rapports_journaliers rj
    JOIN pistolets p ON rj.pistolet_id = p.id
    WHERE 1=1
  `;

  const params = [];

  // Gestion des filtres
  if (filter.type === 'day') {
    query += ' AND rj.date_rapport = CURDATE()';
  } else if (filter.type === 'month' && filter.month && filter.year) {
    query += ' AND MONTH(rj.date_rapport) = ? AND YEAR(rj.date_rapport) = ?';
    params.push(filter.month, filter.year);
  } else if (filter.type === 'year' && filter.year) {
    query += ' AND YEAR(rj.date_rapport) = ?';
    params.push(filter.year);
  } else if (filter.startDate && filter.endDate) {
    query += ' AND rj.date_rapport BETWEEN ? AND ?';
    params.push(filter.startDate, filter.endDate);
  }

  query += ' ORDER BY rj.date_rapport DESC, rj.pistolet_id ASC';

  const [rows] = await db.query(query, params);
  return rows;
},
// Méthode pour récupérer les revenus par date spécifique
getRevenuesByDate: async (date) => {
  const query = `
    SELECT 
      r.pistolet_id,
      p.nom_produit,
      p.prix_unitaire,
      SUM(r.index_fermeture - r.index_ouverture) AS quantite,
      SUM((r.index_fermeture - r.index_ouverture) * p.prix_unitaire) AS montant
    FROM releves_postes r
    JOIN pistolets p ON r.pistolet_id = p.id
    WHERE DATE(r.date_heure_saisie) = ? AND r.statut = 'valide'
    GROUP BY r.pistolet_id
  `;
  
  const [rows] = await db.query(query, [date]);
  return rows;
},
getHistoriqueReleves: async (pistolet_id, date_debut, date_fin) => {
  try {
    let query = `
      SELECT 
        r.id,
        r.affectation_id,
        r.pistolet_id,
        r.index_ouverture,
        r.index_fermeture,
        r.date_heure_saisie,
        r.statut,
        a.pompiste_id,
        u.username as nom_pompiste
      FROM releves_postes r
      JOIN affectations a ON r.affectation_id = a.id
      LEFT JOIN utilisateurs u ON a.pompiste_id = u.id
      WHERE DATE(r.date_heure_saisie) BETWEEN ? AND ?`;
    
    const params = [date_debut, date_fin];
    
    // Ajout condition pistolet_id si fourni
    if (pistolet_id) {
      query += ' AND r.pistolet_id = ?';
      params.push(pistolet_id);
    }
    
    query += ' ORDER BY r.date_heure_saisie DESC';

    const [rows] = await db.query(query, params);
    return rows || [];
    
  } catch (error) {
    console.error('Erreur getHistoriqueReleves:', {
      pistolet_id,
      date_debut,
      date_fin,
      error: error.message
    });
    throw new Error('Erreur lors de la récupération de l\'historique');
  }
},
  updateStatutReleve : async (releveId, nouveauStatut) => {
    try {
      // Vérifier que le statut est valide
      const statutsValides = ['saisie', 'valide', 'annule'];
      if (!statutsValides.includes(nouveauStatut)) {
        throw new Error('Statut invalide');
      }
  
      const [result] = await db.query(
        'UPDATE releves_postes SET statut = ? WHERE id = ?',
        [nouveauStatut, releveId]
      );
  
      if (result.affectedRows === 0) {
        throw new Error('Relevé non trouvé');
      }
  
      return { success: true, message: 'Statut mis à jour avec succès' };
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  },
  // Méthodes existantes mises à jour
  updateStatutPistolet: async (id, statut) => {
    const [result] = await db.query(
      'UPDATE pistolets SET statut = ? WHERE id = ?',
      [statut, id]
    );
    return result.affectedRows;
  },

  getPistoletById: async (id) => {
    const [rows] = await db.query(
      `SELECT p.*, po.nom AS nom_poste 
       FROM pistolets p
       LEFT JOIN pompes pm ON p.pompe_id = pm.id
       LEFT JOIN postes po ON pm.poste_id = po.id
       WHERE p.id = ?`, 
      [id]
    );
    return rows[0];
  },
   // Obtenir tous les pistolets d'une pompe
   getPistoletsByPompeId: async (pompe_id) => {
    const [rows] = await db.query('SELECT * FROM pistolets WHERE pompe_id = ?', [pompe_id]);
    return rows;
  },
   // Obtenir tous les pistolets
   getAllPistolets: async () => {
    const [rows] = await db.query('SELECT * FROM pistolets');
    return rows;
  },
};

export default Pistolet;