import db from '../config/db.js';

const Paiments = {
  create: async (id_credit, montant_paye, mode_paiement, description = '', id_caissier = null) => {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.query({ sql: 'SET SESSION sql_mode = "NO_ENGINE_SUBSTITUTION"', rowsAsArray: true });
      await connection.query('START TRANSACTION');

      if (montant_paye <= 0) {
        throw new Error('Le montant doit être positif');
      }

      // Vérification du rôle si id_caissier est fourni
      if (id_caissier) {
        const [userCheck] = await connection.query(
          `SELECT role FROM utilisateurs WHERE id = ?`,
          [id_caissier]
        );
        
        if (!userCheck.length || userCheck[0].role !== 'caissier') {
          id_caissier = null; // Si le rôle n'est pas caissier, on met à null
        }
      }

      // Récupération des infos du crédit
      const [creditRows] = await connection.query(
        `SELECT dc.solde_credit, dc.montant_restant, dc.etat, dc.id_utilisateur
         FROM details_credits dc 
         WHERE dc.id = ?`, 
        [id_credit]
      );
      
      if (!creditRows.length) throw new Error('Crédit non trouvé');
      
      const credit = creditRows[0];
      const montantRestantActuel = parseFloat(credit.montant_restant);
      const nouveauMontantRestant = montantRestantActuel - parseFloat(montant_paye);

      if (nouveauMontantRestant < 0) {
        await connection.query('ROLLBACK');
        throw new Error('Le paiement dépasse le solde restant');
      }

      // Génération référence
      const reference = `PAY-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

      // Insertion paiement avec id_caissier optionnel
      const [result] = await connection.query(
        `INSERT INTO paiements_credits 
         (id_credit, montant_paye, montant_restant, date_paiement, mode_paiement, 
          reference_paiement, description, id_caissier)
         VALUES (?, ?, ?, NOW(), ?, ?, ?, ?)`,
        [
          id_credit, 
          montant_paye, 
          nouveauMontantRestant, 
          mode_paiement, 
          reference, 
          description,
          id_caissier // Dernier paramètre optionnel
        ]
      );

      // Mise à jour crédit
      const nouvelEtat = nouveauMontantRestant <= 0 ? 'remboursé' : credit.etat;
      
      await connection.query(
        `UPDATE details_credits 
         SET montant_restant = ?, etat = ?, date_dernier_paiement = NOW()
         WHERE id = ?`,
        [nouveauMontantRestant, nouvelEtat, id_credit]
      );

      await connection.query('COMMIT');
      return {
        id: result.insertId,
        reference,
        montant_restant: nouveauMontantRestant,
        etat: nouvelEtat,
        id_utilisateur: credit.id_utilisateur,
        id_caissier // Retourné pour information
      };

    } catch (err) {
      if (connection) await connection.query('ROLLBACK');
      console.error('Erreur création paiement:', err);
      throw err;
    } finally {
      if (connection) connection.release();
    }
  },
  getAll: async () => {
    try {
      const [rows] = await db.execute(
        `SELECT 
            p.id,
            p.id_credit,
            p.montant_paye,
            p.montant_restant,
            p.date_paiement,
            p.mode_paiement,
            p.reference_paiement,
            p.description,
            p.id_caissier,
            u.id as id_utilisateur,
            u.username,
            uc.username as caissier_username,
            c.type_credit,
            c.solde_credit as solde_initial
         FROM paiements_credits p
         JOIN details_credits c ON p.id_credit = c.id
         JOIN utilisateurs u ON c.id_utilisateur = u.id
         LEFT JOIN utilisateurs uc ON p.id_caissier = uc.id 
         ORDER BY p.date_paiement DESC`
      );
  
      return rows.map(row => ({
        id: row.id,
        id_credit: row.id_credit,
        id_utilisateur: row.id_utilisateur,
        id_caissier: row.id_caissier,
        montant_paye: parseFloat(row.montant_paye),
        montant_restant: parseFloat(row.montant_restant),
        date_paiement: new Date(row.date_paiement).toISOString(),
        mode_paiement: row.mode_paiement,
        reference_paiement: row.reference_paiement,
        description: row.description || null,
        username: row.username,
        caissier_username: row.caissier_username,  
        type_credit: row.type_credit,
        solde_initial: parseFloat(row.solde_initial)
      }));
    } catch (err) {
      console.error('Erreur dans Paiments.getAll:', err);
      throw err;
    }
  },

  getByCredit: async (id_credit) => {
    const [rows] = await db.execute(
      `SELECT 
          p.*, 
          u.id as id_utilisateur,
          u.username 
       FROM paiements_credits p
       JOIN details_credits c ON p.id_credit = c.id
       JOIN utilisateurs u ON c.id_utilisateur = u.id
       WHERE p.id_credit = ?
       ORDER BY p.date_paiement DESC`,
      [id_credit]
    );
    return rows;
  },

  getByUser: async (id_utilisateur) => {
    const [rows] = await db.execute(
      `SELECT 
          p.*, 
          c.type_credit, 
          c.solde_credit as credit_initial
       FROM paiements_credits p
       JOIN details_credits c ON p.id_credit = c.id
       WHERE c.id_utilisateur = ?
       ORDER BY p.date_paiement DESC`,
      [id_utilisateur]
    );
    return rows;
  },

  getByReference: async (reference) => {
    const [rows] = await db.execute(
      `SELECT 
          p.*, 
          u.id as id_utilisateur,
          u.username, 
          c.type_credit
       FROM paiements_credits p
       JOIN details_credits c ON p.id_credit = c.id
       JOIN utilisateurs u ON c.id_utilisateur = u.id
       WHERE p.reference_paiement = ?`,
      [reference]
    );
    return rows[0];
  },
  getPaymentStats: async (filterOrUserId) => {
    try {
      let query = `
        SELECT 
          SUM(p.montant_paye) as total_paye,
          COUNT(*) as nombre_paiements,
          p.mode_paiement
        FROM paiements_credits p
        JOIN details_credits c ON p.id_credit = c.id
      `;
  
      const params = [];
  
      if (typeof filterOrUserId === 'object') {
        const filter = filterOrUserId;
        query += ' WHERE 1=1';
  
        if (filter.type === 'day') {
          query += ' AND DATE(p.date_paiement) = CURDATE()';
        } else if (filter.type === 'month' && filter.month && filter.year) {
          query += ' AND MONTH(p.date_paiement) = ? AND YEAR(p.date_paiement) = ?';
          params.push(filter.month, filter.year);
        } else if (filter.type === 'year' && filter.year) {
          query += ' AND YEAR(p.date_paiement) = ?';
          params.push(filter.year);
        } else if (filter.startDate && filter.endDate) {
          query += ' AND DATE(p.date_paiement) BETWEEN ? AND ?';
          params.push(filter.startDate, filter.endDate);
        }
      } else {
        query += ' WHERE c.id_utilisateur = ?';
        params.push(filterOrUserId);
      }
  
      query += ' GROUP BY p.mode_paiement';
  
      const [rows] = await db.query(query, params);
      
      // Calculer les totaux même si rows est vide
      const total_paye = rows.reduce((sum, item) => sum + parseFloat(item.total_paye || 0), 0);
      const nombre_paiements = rows.reduce((sum, item) => sum + (item.nombre_paiements || 0), 0);
  
      return {
        rows,
        total_paye,
        nombre_paiements
      };
  
    } catch (err) {
      console.error('Error in getPaymentStats:', err);
      return {
        rows: [],
        total_paye: 0,
        nombre_paiements: 0
      };
    }
  },

  getPaymentsByDate: async (filter) => {
    let query = `
      SELECT 
        DATE(p.date_paiement) as date,
        SUM(p.montant_paye) as total_paye,
        COUNT(*) as nombre_paiements
      FROM paiements_credits p
      WHERE 1=1
    `;

    const params = [];

    if (filter.type === 'day') {
      query += ' AND DATE(p.date_paiement) = CURDATE()';
    } else if (filter.type === 'month' && filter.month && filter.year) {
      query += ' AND MONTH(p.date_paiement) = ? AND YEAR(p.date_paiement) = ?';
      params.push(filter.month, filter.year);
    } else if (filter.type === 'year' && filter.year) {
      query += ' AND YEAR(p.date_paiement) = ?';
      params.push(filter.year);
    }

    query += ' GROUP BY DATE(p.date_paiement) ORDER BY date';

    const [rows] = await db.query(query, params);
    return rows;
  },

  getRecentPayments: async (id_utilisateur, limit = 5) => {
    const query = `
      SELECT 
        p.*,
        c.type_credit
      FROM paiements_credits p
      JOIN details_credits c ON p.id_credit = c.id
      WHERE c.id_utilisateur = ?
      ORDER BY p.date_paiement DESC
      LIMIT ?
    `;
    return db.execute(query, [id_utilisateur, limit]);
  },
  getByCaissier: async (id_caissier, filters = {}) => {
    try {
      let query = `
        SELECT 
          p.id,
          p.id_credit,
          p.montant_paye,
          p.montant_restant,
          p.date_paiement,
          p.mode_paiement,
          p.reference_paiement,
          p.description,
          u.id as id_utilisateur,
          u.username,
          u.email,
          c.type_credit,
          c.solde_credit as solde_initial,
          c.date_debut,
          c.duree_credit,
          DATE_ADD(c.date_debut, INTERVAL c.duree_credit DAY) as date_fin
        FROM paiements_credits p
        JOIN details_credits c ON p.id_credit = c.id
        JOIN utilisateurs u ON c.id_utilisateur = u.id
        WHERE p.id_caissier = ?
      `;
  
      const params = [id_caissier];
  
      // Filtres optionnels
      if (filters.date_debut && filters.date_fin) {
        query += ' AND DATE(p.date_paiement) BETWEEN ? AND ?';
        params.push(filters.date_debut, filters.date_fin);
      } else if (filters.date_debut) {
        query += ' AND DATE(p.date_paiement) >= ?';
        params.push(filters.date_debut);
      } else if (filters.date_fin) {
        query += ' AND DATE(p.date_paiement) <= ?';
        params.push(filters.date_fin);
      }
  
      if (filters.mode_paiement) {
        query += ' AND p.mode_paiement = ?';
        params.push(filters.mode_paiement);
      }
  
      if (filters.id_credit) {
        query += ' AND p.id_credit = ?';
        params.push(filters.id_credit);
      }
  
      if (filters.id_utilisateur) {
        query += ' AND c.id_utilisateur = ?';
        params.push(filters.id_utilisateur);
      }
  
      // Tri et limite
      query += ' ORDER BY p.date_paiement DESC';
  
      if (filters.limit) {
        query += ' LIMIT ?';
        params.push(filters.limit);
      }
  
      const [rows] = await db.execute(query, params);
  
      return rows.map(row => ({
        ...row,
        montant_paye: parseFloat(row.montant_paye),
        montant_restant: parseFloat(row.montant_restant),
        solde_initial: parseFloat(row.solde_initial),
        date_paiement: new Date(row.date_paiement).toISOString(),
        date_fin: row.date_fin_calculee ? new Date(row.date_fin_calculee).toISOString() : null
      }));
    } catch (err) {
      console.error('Erreur dans Paiments.getByCaissier:', err);
      throw err;
    }
  },
  // Méthode pour les stats (déjà correcte)
  getCaissierStats: async (id_caissier, filters = {}) => {
    try {
      let query = `
        SELECT 
          SUM(p.montant_paye) as total_paye,
          COUNT(*) as nombre_paiements,
          p.mode_paiement,
          DATE(p.date_paiement) as date
        FROM paiements_credits p
        WHERE p.id_caissier = ?
      `;
  
      const params = [id_caissier];
  
      // Filtres optionnels
      if (filters.date_debut && filters.date_fin) {
        query += ' AND DATE(p.date_paiement) BETWEEN ? AND ?';
        params.push(filters.date_debut, filters.date_fin);
      } else if (filters.period === 'day') {
        query += ' AND DATE(p.date_paiement) = CURDATE()';
      } else if (filters.period === 'month') {
        query += ' AND MONTH(p.date_paiement) = MONTH(CURRENT_DATE()) AND YEAR(p.date_paiement) = YEAR(CURRENT_DATE())';
      } else if (filters.period === 'year') {
        query += ' AND YEAR(p.date_paiement) = YEAR(CURRENT_DATE())';
      }
  
      query += ' GROUP BY p.mode_paiement, DATE(p.date_paiement)';
  
      const [rows] = await db.execute(query, params);
  
      return {
        total: rows.reduce((sum, item) => sum + parseFloat(item.total_paye), 0),
        by_mode: rows.reduce((acc, item) => {
          if (!acc[item.mode_paiement]) {
            acc[item.mode_paiement] = 0;
          }
          acc[item.mode_paiement] += parseFloat(item.total_paye);
          return acc;
        }, {}),
        count: rows.reduce((sum, item) => sum + item.nombre_paiements, 0)
      };
    } catch (err) {
      console.error('Erreur dans Paiments.getCaissierStats:', err);
      throw err;
    }
  }}

export default Paiments;