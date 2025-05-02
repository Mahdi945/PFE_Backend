import db from '../config/db.js';

const Transaction = {
  // Ajouter une transaction (sans id_utilisateur)
  addTransaction: (id_vehicule, quantite, montant, id_credit) => {
    const query = `
      INSERT INTO transactions (id_vehicule, quantite, montant, id_credit, date_transaction) 
      VALUES (?, ?, ?, ?, NOW())
    `;
    return db.execute(query, [id_vehicule, quantite, montant, id_credit]);
  },

  // Récupérer toutes les transactions avec jointures
  getAllTransactions: () => {
    const query = `
      SELECT 
        t.id,
        t.id_vehicule,
        t.quantite,
        t.montant,
        t.id_credit,
        t.date_transaction,
        v.immatriculation,
        v.marque,
        v.type_vehicule,
        dc.id_utilisateur,
        u.username,
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

  // Statistiques des transactions pour un utilisateur
  getTransactionStats: (id_utilisateur) => {
    const query = `
      SELECT 
        COUNT(t.id) AS total_transactions,
        SUM(t.quantite) AS total_quantite,
        SUM(t.montant) AS total_montant,
        SUM(CASE WHEN t.id_credit IS NOT NULL THEN t.montant ELSE 0 END) AS credit_amount,
        SUM(CASE WHEN t.id_credit IS NULL THEN t.montant ELSE 0 END) AS cash_amount
      FROM transactions t
      JOIN details_credits dc ON t.id_credit = dc.id
      WHERE dc.id_utilisateur = ?
    `;
    return db.execute(query, [id_utilisateur]);
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