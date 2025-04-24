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
      const now = new Date();
      const heure = now.getHours();
      const minute = now.getMinutes();
      console.log(`Saisie effectuée à ${heure}h${minute}`);
  
      // Détermination de la date de poste (hier pour le poste de nuit)
      let datePoste;
      if (heure >= 22 || heure < 6) {
        datePoste = new Date(now);
        datePoste.setDate(datePoste.getDate() - 1);
        datePoste = datePoste.toISOString().split('T')[0];
      } else {
        datePoste = now.toISOString().split('T')[0];
      }
  
      // Vérification des relevés existants pour cette date de poste
      const [existingReleve] = await db.query(
        `SELECT id FROM releves_postes 
         WHERE affectation_id = ? AND pistolet_id = ?
         AND (
           (HOUR(date_heure_saisie) >= 22 AND DATE(date_heure_saisie) = DATE_SUB(CURDATE(), INTERVAL 1 DAY))
           OR
           (HOUR(date_heure_saisie) < 22 AND DATE(date_heure_saisie) = CURDATE())
         )`,
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
  
      // Insertion avec la date/heure actuelle
      const [result] = await db.query(
        `INSERT INTO releves_postes 
        (affectation_id, pistolet_id, index_ouverture, index_fermeture, date_heure_saisie) 
        VALUES (?, ?, ?, ?, NOW())`,  // Utilisation de NOW() pour la date/heure réelle
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
  generateRapportJournalier: async (date) => {
    try {
      // Vérifier le format de la date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error('Format de date invalide');
      }
  
      // Supprimer les anciens rapports pour cette date
      await db.query('DELETE FROM rapports_journaliers WHERE date_rapport = ?', [date]);
      
      // Générer les nouveaux rapports en utilisant directement la date
      const [result] = await db.query(
        `INSERT INTO rapports_journaliers 
        (date_rapport, pistolet_id, total_quantite, total_montant, nombre_postes)
        SELECT 
          ?,
          r.pistolet_id,
          SUM(r.index_fermeture - r.index_ouverture) AS total_quantite,
          SUM((r.index_fermeture - r.index_ouverture) * p.prix_unitaire) AS total_montant,
          COUNT(DISTINCT a.poste_id) AS nombre_postes
        FROM releves_postes r
        JOIN affectations a ON r.affectation_id = a.id
        JOIN pistolets p ON r.pistolet_id = p.id
        WHERE DATE(r.date_heure_saisie) = ? AND r.statut = 'saisie'
        GROUP BY r.pistolet_id`,
        [date, date]
      );
      
      return result.affectedRows || 0;
      
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
      throw error;
    }
  },
// Récupérer les données pour visualisation (version simplifiée sans calendrier)
getRevenusJournaliers: async (date_debut, date_fin, pistolet_id = null) => {
  let query = `
    SELECT 
      DATE(r.date_heure_saisie) as date,
      r.pistolet_id,
      p.nom_produit,
      p.prix_unitaire,
      a.poste_id,
      SUM(r.index_fermeture - r.index_ouverture) AS quantite,
      SUM((r.index_fermeture - r.index_ouverture) * p.prix_unitaire) AS montant
    FROM releves_postes r
    JOIN affectations a ON r.affectation_id = a.id
    JOIN pistolets p ON r.pistolet_id = p.id
    WHERE DATE(r.date_heure_saisie) BETWEEN ? AND ? 
      AND r.statut = 'saisie'
  `;
  
  const params = [date_debut, date_fin];
  
  if (pistolet_id) {
    query += ' AND r.pistolet_id = ?';
    params.push(pistolet_id);
  }
  
  query += ' GROUP BY DATE(r.date_heure_saisie), r.pistolet_id, a.poste_id ORDER BY date, r.pistolet_id, a.poste_id';
  
  const [rows] = await db.query(query, params);
  return rows;
},
  // Récupérer l'historique des relevés
  getHistoriqueReleves: async (pistolet_id, date_debut, date_fin) => {
    const [rows] = await db.query(
      `SELECT r.*, a.poste_id, c.date 
       FROM releves_postes r
       JOIN affectations a ON r.affectation_id = a.id
       JOIN calendrier c ON a.calendrier_id = c.id
       WHERE r.pistolet_id = ? AND c.date BETWEEN ? AND ?
       ORDER BY c.date, a.poste_id`,
      [pistolet_id, date_debut, date_fin]
    );
    return rows;
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