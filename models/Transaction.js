import db from '../config/db.js';

const Transaction = {
  // Ajouter une transaction (sans id_utilisateur)
  addTransaction: (id_vehicule, quantite, montant, id_credit, preuve = null) => {
    const query = `
      INSERT INTO transactions (id_vehicule, quantite, montant, id_credit, preuve, date_transaction) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    return db.execute(query, [id_vehicule, quantite, montant, id_credit, preuve]);
  },

  // Récupérer toutes les transactions avec jointures (incluant preuve)
  getAllTransactions: () => {
    const query = `
      SELECT 
        t.id,
        t.id_vehicule,
        t.quantite,
        t.montant,
        t.id_credit,
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
        dc.type_credit
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      LEFT JOIN details_credits dc ON t.id_credit = dc.id
      LEFT JOIN utilisateurs u ON dc.id_utilisateur = u.id
      ORDER BY t.date_transaction DESC
    `;
    return db.execute(query);
  },

  // Récupérer les transactions par utilisateur (via details_credits)
  getTransactionsByUser: (id_utilisateur) => {
    const query = `
      SELECT 
        t.*,
        v.immatriculation,
        v.marque,
        dc.type_credit,
        dc.solde_credit,
        dc.credit_utilise
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      JOIN details_credits dc ON t.id_credit = dc.id
      WHERE dc.id_utilisateur = ?
      ORDER BY t.date_transaction DESC
    `;
    return db.execute(query, [id_utilisateur]);
  },
  
  getTransactionStatsByPeriod: (filter = {}) => {
    let query = `
      SELECT 
        YEAR(date_transaction) as year,
        MONTH(date_transaction) as month,
        SUM(montant) as total_montant,
        COUNT(id) as nombre_transactions,
        (SUM(montant) - LAG(SUM(montant), 1) OVER (ORDER BY YEAR(date_transaction), MONTH(date_transaction))) as progression_mois,
        (SUM(montant) - LAG(SUM(montant), 12) OVER (ORDER BY YEAR(date_transaction), MONTH(date_transaction))) as progression_annee
      FROM transactions
      WHERE 1=1
    `;
  
    const params = [];
  
    if (filter.type === 'day') {
      query += ' AND DATE(date_transaction) = CURDATE()';
    } else if (filter.type === 'month') {
      query += ' AND MONTH(date_transaction) = ? AND YEAR(date_transaction) = ?';
      params.push(filter.month || new Date().getMonth() + 1, filter.year || new Date().getFullYear());
    } else if (filter.type === 'year') {
      query += ' AND YEAR(date_transaction) = ?';
      params.push(filter.year || new Date().getFullYear());
    }
  
    query += ' GROUP BY YEAR(date_transaction), MONTH(date_transaction) ORDER BY year, month';
  
    return db.execute(query, params);
  },
  // Récupérer les transactions liées à un crédit
  getTransactionsByCredit: (id_credit) => {
    const query = `
      SELECT 
        t.*,
        v.immatriculation,
        v.marque,
        u.username
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      JOIN details_credits dc ON t.id_credit = dc.id
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE t.id_credit = ?
      ORDER BY t.date_transaction DESC
    `;
    return db.execute(query, [id_credit]);
  },

  // Mettre à jour un crédit
  updateCredit: (id_credit, montant) => {
    return db.execute('SELECT * FROM details_credits WHERE id = ?', [id_credit])
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
          throw new Error(`Le crédit utilisé (${nouveauCreditUtilise}) dépasse le solde total (${soldeCredit})`);
        }
  
        // Détermination de l'état
        const nouvelEtat = nouveauCreditUtilise === soldeCredit ? 'expiré' : (credit.etat || 'actif');
  
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

// models/Transaction.js
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
    params.push(filter.month || new Date().getMonth() + 1, filter.year || new Date().getFullYear());
  } else if (filter.type === 'year') {
    query += ' AND YEAR(date_transaction) = ?';
    params.push(filter.year || new Date().getFullYear());
  }

  query += ' GROUP BY YEAR(date_transaction), MONTH(date_transaction) ORDER BY year, month';

  return db.execute(query, params);
},

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

  // Dernières transactions pour le dashboard utilisateur
  getRecentTransactions: (id_utilisateur, limit = 5) => {
    const query = `
      SELECT 
        t.*,
        v.immatriculation,
        v.marque,
        dc.type_credit
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      JOIN details_credits dc ON t.id_credit = dc.id
      WHERE dc.id_utilisateur = ?
      ORDER BY t.date_transaction DESC
      LIMIT ?
    `;
    return db.execute(query, [id_utilisateur, limit]);
  },

  // Statistiques globales des transactions
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

  // Transactions récentes (toutes)
  getRecentTransactionsAll: () => {
    const query = `
      SELECT 
        t.*,
        v.immatriculation,
        v.marque,
        u.username,
        dc.type_credit
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      JOIN details_credits dc ON t.id_credit = dc.id
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      ORDER BY t.date_transaction DESC
      LIMIT 10
    `;
    return db.execute(query);
  }
};

export default Transaction;