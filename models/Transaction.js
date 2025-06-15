import db from '../config/db.js';

const Transaction = {
  // Ajoute une nouvelle transaction sans id_credit (déterminé via id_vehicule)
  addTransaction: (id_vehicule, quantite, montant, preuve = null, id_pompiste) => {
    const query = `
    INSERT INTO transactions 
      (id_vehicule, quantite, montant, preuve, date_transaction, id_pompiste) 
    VALUES (?, ?, ?, ?, NOW(), ?)
  `;
    return db.execute(query, [
      id_vehicule, // 1er paramètre
      quantite, // 2ème paramètre
      montant, // 3ème paramètre
      preuve, // 4ème paramètre (peut être null)
      id_pompiste, // 5ème paramètre (NOW() est le 6ème)
    ]);
  },
  // Récupère les tendances de transactions sur 30 jours
  getTransactionTrends: (filter = {}) => {
    let query = `
    SELECT 
      YEAR(date_transaction) as year,
      MONTH(date_transaction) as month,
      DAY(date_transaction) as day,
      DATE(date_transaction) as date,
      SUM(montant) as total_montant,
      COUNT(id) as count,
      (SUM(montant) - LAG(SUM(montant), 1) OVER (ORDER BY DATE(date_transaction))) as daily_change,
      (SUM(montant) - LAG(SUM(montant), 1) OVER (ORDER BY YEAR(date_transaction), MONTH(date_transaction))) as monthly_change,
      (SUM(montant) - LAG(SUM(montant), 12) OVER (ORDER BY YEAR(date_transaction), MONTH(date_transaction))) as yearly_change
    FROM transactions
    WHERE 1=1
  `;

    const params = [];

    if (filter.type === 'day') {
      query += ' AND DATE(date_transaction) = CURDATE()';
    } else if (filter.type === 'month') {
      query += ' AND MONTH(date_transaction) = ? AND YEAR(date_transaction) = ?';
      params.push(
        filter.month || new Date().getMonth() + 1,
        filter.year || new Date().getFullYear()
      );
    } else if (filter.type === 'year') {
      query += ' AND YEAR(date_transaction) = ?';
      params.push(filter.year || new Date().getFullYear());
    }

    if (filter.type === 'day') {
      query += ' GROUP BY DATE(date_transaction), DAY(date_transaction) ORDER BY date';
    } else if (filter.type === 'month') {
      query += ' GROUP BY YEAR(date_transaction), MONTH(date_transaction) ORDER BY year, month';
    } else if (filter.type === 'year') {
      query += ' GROUP BY YEAR(date_transaction) ORDER BY year';
    } else {
      query += ' GROUP BY DATE(date_transaction) ORDER BY date';
    }

    return db.execute(query, params);
  },
  // Obtient les statistiques globales des transactions
  getTransactionStats: async filterOrUserId => {
    let query = `
    SELECT 
      SUM(t.montant) as total_montant,
      COUNT(*) as nombre_transactions,
      v.type_vehicule,
      dc.type_credit
    FROM transactions t
    JOIN vehicules v ON t.id_vehicule = v.id
    LEFT JOIN details_credits dc ON v.id_credit = dc.id
  `;

    const params = [];

    if (typeof filterOrUserId === 'object') {
      const filter = filterOrUserId;
      query += ' WHERE 1=1';

      if (filter.type === 'day') {
        query += ' AND DATE(t.date_transaction) = CURDATE()';
      } else if (filter.type === 'month' && filter.month && filter.year) {
        query += ' AND MONTH(t.date_transaction) = ? AND YEAR(t.date_transaction) = ?';
        params.push(filter.month, filter.year);
      } else if (filter.type === 'year' && filter.year) {
        query += ' AND YEAR(t.date_transaction) = ?';
        params.push(filter.year);
      } else if (filter.startDate && filter.endDate) {
        query += ' AND DATE(t.date_transaction) BETWEEN ? AND ?';
        params.push(filter.startDate, filter.endDate);
      }
    } else {
      query += ' WHERE dc.id_utilisateur = ?';
      params.push(filterOrUserId);
    }

    query += ' GROUP BY v.type_vehicule, dc.type_credit';

    const [rows] = await db.query(query, params);
    return rows;
  },
  // Récupère toutes les transactions avec pagination
  getAllTransactions: () => {
    const query = `
    SELECT 
      t.id,
      t.id_vehicule,
      t.quantite,
      t.montant,
      v.id_credit,
      t.preuve,
      t.date_transaction,
      v.immatriculation,
      v.marque,
      v.type_vehicule,
      dc.id_utilisateur,  
      dc.credit_utilise,
      dc.solde_credit,
      dc.montant_restant,
      u.username,
      u.email,
      u.numero_telephone,
      dc.type_credit,
      up.id AS pompiste_id,
      up.username AS pompiste_username,
      up.email AS pompiste_email,
      up.numero_telephone AS pompiste_telephone,
      up.role AS pompiste_role
    FROM transactions t
    JOIN vehicules v ON t.id_vehicule = v.id
    LEFT JOIN details_credits dc ON v.id_credit = dc.id
    LEFT JOIN utilisateurs u ON dc.id_utilisateur = u.id
    LEFT JOIN utilisateurs up ON t.id_pompiste = up.id
    ORDER BY t.date_transaction DESC
  `;
    return db.execute(query);
  },
  // Obtient les transactions d'un utilisateur spécifique
  getTransactionsByUser: id_utilisateur => {
    const query = `
      SELECT 
        t.*,
        v.id_credit,
        v.immatriculation,
        v.marque,
        dc.type_credit,
        dc.solde_credit,
        dc.credit_utilise
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      JOIN details_credits dc ON v.id_credit = dc.id
      WHERE dc.id_utilisateur = ?
      ORDER BY t.date_transaction DESC
    `;
    return db.execute(query, [id_utilisateur]);
  },

  // Met à jour le crédit d'un utilisateur
  updateCredit: (id_credit, montant) => {
    return db
      .execute('SELECT * FROM details_credits WHERE id = ?', [id_credit])
      .then(([rows]) => {
        if (rows.length === 0) {
          throw new Error('Crédit introuvable');
        }

        const credit = rows[0];
        const soldeCredit = parseFloat(credit.solde_credit);
        const creditUtilise = parseFloat(credit.credit_utilise) || 0;
        const montantTransaction = parseFloat(montant);
        const nouveauCreditUtilise = creditUtilise + montantTransaction;

        // Vérification que le crédit utilisé ne dépasse pas le solde
        if (nouveauCreditUtilise > soldeCredit) {
          throw new Error(
            `Le crédit utilisé (${nouveauCreditUtilise}) dépasse le solde total (${soldeCredit})`
          );
        }

        // Détermination de l'état
        const nouvelEtat = nouveauCreditUtilise === soldeCredit ? 'expiré' : credit.etat || 'actif';

        // Requête de mise à jour
        return db.execute(
          `UPDATE details_credits 
           SET credit_utilise = ?,
               etat = ?,
               date_dernier_paiement = NOW()
           WHERE id = ?`,
          [nouveauCreditUtilise, nouvelEtat, id_credit]
        );
      })
      .then(([result]) => {
        if (result.affectedRows === 0) {
          throw new Error('Aucun crédit mis à jour');
        }
        return { success: true };
      })
      .catch(error => {
        console.error('Erreur updateCredit:', error);
        throw error;
      });
  },

  // Calcule les statistiques par période (jour/mois/année)
  getTransactionStatsByPeriod: (filter = {}) => {
    let query = `
      SELECT 
        YEAR(date_transaction) as year,
        MONTH(date_transaction) as month,
        SUM(montant) as total_montant,
        COUNT(id) as nombre_transactions
      FROM transactions
      WHERE 1=1
    `;

    const params = [];

    if (filter.type === 'day') {
      query += ' AND DATE(date_transaction) = CURDATE()';
    } else if (filter.type === 'month') {
      query += ' AND MONTH(date_transaction) = ? AND YEAR(date_transaction) = ?';
      params.push(
        filter.month || new Date().getMonth() + 1,
        filter.year || new Date().getFullYear()
      );
    } else if (filter.type === 'year') {
      query += ' AND YEAR(date_transaction) = ?';
      params.push(filter.year || new Date().getFullYear());
    }

    if (filter.type === 'month') {
      query += ' GROUP BY YEAR(date_transaction), MONTH(date_transaction)';
    } else if (filter.type === 'year') {
      query += ' GROUP BY YEAR(date_transaction), MONTH(date_transaction)';
    } else {
      query += ' GROUP BY DATE(date_transaction)';
    }

    query += ' ORDER BY year, month';

    return db.execute(query, params);
  },

  // Obtient les statistiques quotidiennes des transactions
  getDailyTransactionStats: (filter = {}) => {
    let query = `
    SELECT 
      DATE(date_transaction) as date,
      SUM(montant) as total_montant,
      COUNT(id) as nombre_transactions
    FROM transactions
    WHERE 1=1
  `;

    const params = [];

    if (filter.type === 'day') {
      query += ' AND DATE(date_transaction) = CURDATE()';
    } else if (filter.type === 'month' && filter.month && filter.year) {
      query += ' AND MONTH(date_transaction) = ? AND YEAR(date_transaction) = ?';
      params.push(filter.month, filter.year);
    } else if (filter.type === 'year' && filter.year) {
      query += ' AND YEAR(date_transaction) = ?';
      params.push(filter.year);
    }

    query += ' GROUP BY DATE(date_transaction) ORDER BY date';

    return db.execute(query, params);
  },

  // Récupère les transactions récentes d'un utilisateur
  getRecentTransactions: (id_utilisateur, limit = 5) => {
    const query = `
      SELECT 
        t.*,
        v.id_credit,
        v.immatriculation,
        v.marque,
        dc.type_credit
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      JOIN details_credits dc ON v.id_credit = dc.id
      WHERE dc.id_utilisateur = ?
      ORDER BY t.date_transaction DESC
      LIMIT ?
    `;
    return db.execute(query, [id_utilisateur, limit]);
  },

  // Obtient les statistiques globales pour le dashboard
  getGlobalTransactionStats: () => {
    const query = `
      SELECT 
        COUNT(*) AS total_transactions,
        SUM(quantite) AS total_quantite,
        SUM(montant) AS total_montant,
        DATE_FORMAT(MIN(date_transaction), '%Y-%m-%d') AS first_transaction_date,
        DATE_FORMAT(MAX(date_transaction), '%Y-%m-%d') AS last_transaction_date
      FROM transactions
    `;
    return db.execute(query);
  },

  // Récupère toutes les transactions récentes du système
  getRecentTransactionsAll: () => {
    const query = `
      SELECT 
        t.*,
        v.id_credit,
        v.immatriculation,
        v.marque,
        u.username,
        dc.type_credit
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      JOIN details_credits dc ON v.id_credit = dc.id
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      ORDER BY t.date_transaction DESC
      LIMIT 10
    `;
    return db.execute(query);
  },

  // Récupère les transactions par pompiste avec statistiques et filtrage par date
  getTransactionsByPompiste: async (id_pompiste, filter = {}) => {
    try {
      // Construction de la clause WHERE pour le filtrage par date
      let dateFilter = '';
      const params = [id_pompiste];

      if (filter.type === 'day') {
        if (filter.date) {
          dateFilter = 'AND DATE(t.date_transaction) = ?';
          params.push(filter.date);
        } else {
          dateFilter = 'AND DATE(t.date_transaction) = CURDATE()';
        }
      } else if (filter.type === 'month') {
        const month = filter.month || new Date().getMonth() + 1;
        const year = filter.year || new Date().getFullYear();
        dateFilter = 'AND MONTH(t.date_transaction) = ? AND YEAR(t.date_transaction) = ?';
        params.push(month, year);
      } else if (filter.type === 'year') {
        const year = filter.year || new Date().getFullYear();
        dateFilter = 'AND YEAR(t.date_transaction) = ?';
        params.push(year);
      } else if (filter.startDate && filter.endDate) {
        dateFilter = 'AND DATE(t.date_transaction) BETWEEN ? AND ?';
        params.push(filter.startDate, filter.endDate);
      }

      // Requête pour récupérer les transactions détaillées
      const transactionsQuery = `
        SELECT 
          t.id,
          t.id_vehicule,
          t.quantite,
          t.montant,
          v.id_credit,
          t.preuve,
          t.date_transaction,
          t.id_pompiste,
          v.immatriculation,
          v.marque,
          v.type_vehicule,
          dc.id_utilisateur,
          dc.credit_utilise,
          dc.solde_credit,
          dc.type_credit,
          u.username AS client_username,
          u.email AS client_email,
          u.numero_telephone AS client_telephone,
          up.username AS pompiste_username,
          up.email AS pompiste_email,
          up.numero_telephone AS pompiste_telephone,
          CASE 
            WHEN dc.solde_credit - dc.credit_utilise <= 0 THEN 'Crédit épuisé'
            WHEN dc.solde_credit - dc.credit_utilise < 50 THEN 'Crédit faible'
            ELSE 'Crédit suffisant'
          END AS statut_credit
        FROM transactions t
        JOIN vehicules v ON t.id_vehicule = v.id
        LEFT JOIN details_credits dc ON v.id_credit = dc.id
        LEFT JOIN utilisateurs u ON dc.id_utilisateur = u.id
        LEFT JOIN utilisateurs up ON t.id_pompiste = up.id
        WHERE t.id_pompiste = ? ${dateFilter}
        ORDER BY t.date_transaction DESC
      `;

      // Requête pour les statistiques globales
      const statsQuery = `
        SELECT 
          COUNT(*) AS total_transactions,
          SUM(t.quantite) AS total_quantite,
          SUM(t.montant) AS total_montant,
          AVG(t.montant) AS montant_moyen,
          AVG(t.quantite) AS quantite_moyenne,
          MIN(t.montant) AS montant_min,
          MAX(t.montant) AS montant_max,
          MIN(t.quantite) AS quantite_min,
          MAX(t.quantite) AS quantite_max,
          COUNT(DISTINCT t.id_vehicule) AS vehicules_servis,
          COUNT(DISTINCT dc.id_utilisateur) AS clients_servis,
          DATE_FORMAT(MIN(t.date_transaction), '%Y-%m-%d %H:%i:%s') AS premiere_transaction,
          DATE_FORMAT(MAX(t.date_transaction), '%Y-%m-%d %H:%i:%s') AS derniere_transaction
        FROM transactions t
        JOIN vehicules v ON t.id_vehicule = v.id
        LEFT JOIN details_credits dc ON v.id_credit = dc.id
        WHERE t.id_pompiste = ? ${dateFilter}
      `;

      // Requête pour les statistiques par type de véhicule
      const vehicleStatsQuery = `
        SELECT 
          v.type_vehicule,
          COUNT(*) AS nombre_transactions,
          SUM(t.quantite) AS total_quantite,
          SUM(t.montant) AS total_montant,
          AVG(t.montant) AS montant_moyen,
          AVG(t.quantite) AS quantite_moyenne
        FROM transactions t
        JOIN vehicules v ON t.id_vehicule = v.id
        WHERE t.id_pompiste = ? ${dateFilter}
        GROUP BY v.type_vehicule
        ORDER BY total_montant DESC
      `;

      // Requête pour les statistiques par type de crédit
      const creditStatsQuery = `
        SELECT 
          dc.type_credit,
          COUNT(*) AS nombre_transactions,
          SUM(t.quantite) AS total_quantite,
          SUM(t.montant) AS total_montant,
          AVG(t.montant) AS montant_moyen,
          COUNT(DISTINCT dc.id_utilisateur) AS nombre_clients
        FROM transactions t
        JOIN vehicules v ON t.id_vehicule = v.id
        LEFT JOIN details_credits dc ON v.id_credit = dc.id
        WHERE t.id_pompiste = ? ${dateFilter}
        GROUP BY dc.type_credit
        ORDER BY total_montant DESC
      `;

      // Requête pour les statistiques par période (basée sur le type de filtre)
      let periodStatsQuery = '';
      if (filter.type === 'day') {
        periodStatsQuery = `
          SELECT 
            HOUR(t.date_transaction) AS periode,
            'Heure' AS type_periode,
            COUNT(*) AS nombre_transactions,
            SUM(t.quantite) AS total_quantite,
            SUM(t.montant) AS total_montant,
            AVG(t.montant) AS montant_moyen
          FROM transactions t
          WHERE t.id_pompiste = ? ${dateFilter}
          GROUP BY HOUR(t.date_transaction)
          ORDER BY periode
        `;
      } else if (filter.type === 'month') {
        periodStatsQuery = `
          SELECT 
            DAY(t.date_transaction) AS periode,
            'Jour' AS type_periode,
            COUNT(*) AS nombre_transactions,
            SUM(t.quantite) AS total_quantite,
            SUM(t.montant) AS total_montant,
            AVG(t.montant) AS montant_moyen
          FROM transactions t
          WHERE t.id_pompiste = ? ${dateFilter}
          GROUP BY DAY(t.date_transaction)
          ORDER BY periode
        `;
      } else if (filter.type === 'year') {
        periodStatsQuery = `
          SELECT 
            MONTH(t.date_transaction) AS periode,
            'Mois' AS type_periode,
            COUNT(*) AS nombre_transactions,
            SUM(t.quantite) AS total_quantite,
            SUM(t.montant) AS total_montant,
            AVG(t.montant) AS montant_moyen
          FROM transactions t
          WHERE t.id_pompiste = ? ${dateFilter}
          GROUP BY MONTH(t.date_transaction)
          ORDER BY periode
        `;
      } else {
        // Par défaut, regrouper par jour sur les 30 derniers jours
        periodStatsQuery = `
          SELECT 
            DATE(t.date_transaction) AS periode,
            'Jour' AS type_periode,
            COUNT(*) AS nombre_transactions,
            SUM(t.quantite) AS total_quantite,
            SUM(t.montant) AS total_montant,
            AVG(t.montant) AS montant_moyen
          FROM transactions t
          WHERE t.id_pompiste = ? AND t.date_transaction >= DATE_SUB(NOW(), INTERVAL 30 DAY)
          GROUP BY DATE(t.date_transaction)
          ORDER BY periode DESC
        `;
      }

      // Requête pour les clients les plus fréquents
      const topClientsQuery = `
        SELECT 
          u.id AS client_id,
          u.username,
          u.email,
          u.numero_telephone,
          COUNT(*) AS nombre_transactions,
          SUM(t.quantite) AS total_quantite,
          SUM(t.montant) AS total_montant,
          AVG(t.montant) AS montant_moyen,
          DATE_FORMAT(MAX(t.date_transaction), '%Y-%m-%d %H:%i:%s') AS derniere_transaction
        FROM transactions t
        JOIN vehicules v ON t.id_vehicule = v.id
        LEFT JOIN details_credits dc ON v.id_credit = dc.id
        LEFT JOIN utilisateurs u ON dc.id_utilisateur = u.id
        WHERE t.id_pompiste = ? ${dateFilter}
        GROUP BY u.id, u.username, u.email, u.numero_telephone
        ORDER BY nombre_transactions DESC, total_montant DESC
        LIMIT 10
      `;

      // Exécution de toutes les requêtes
      const [transactions] = await db.execute(transactionsQuery, params);
      const [globalStats] = await db.execute(statsQuery, params);
      const [vehicleStats] = await db.execute(vehicleStatsQuery, params);
      const [creditStats] = await db.execute(creditStatsQuery, params);
      const [periodStats] = await db.execute(periodStatsQuery, params);
      const [topClients] = await db.execute(topClientsQuery, params);

      // Construction de la réponse
      return {
        transactions,
        statistiques: {
          globales: globalStats[0] || {
            total_transactions: 0,
            total_quantite: 0,
            total_montant: 0,
            montant_moyen: 0,
            quantite_moyenne: 0,
            montant_min: 0,
            montant_max: 0,
            quantite_min: 0,
            quantite_max: 0,
            vehicules_servis: 0,
            clients_servis: 0,
            premiere_transaction: null,
            derniere_transaction: null,
          },
          par_vehicule: vehicleStats,
          par_credit: creditStats,
          par_periode: periodStats,
          clients_frequents: topClients,
        },
        filtre_applique: filter,
        pompiste_id: id_pompiste,
      };
    } catch (error) {
      console.error('Erreur dans getTransactionsByPompiste:', error);
      throw error;
    }
  },
};

export default Transaction;
