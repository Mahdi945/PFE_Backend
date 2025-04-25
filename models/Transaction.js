import db from '../config/db.js';

const Transaction = {
  // Ajouter une transaction
  addTransaction: (id_vehicule, id_utilisateur, quantite, montant, id_credit) => {
    const query = `
      INSERT INTO transactions (id_vehicule, id_utilisateur, quantite, montant, id_credit, date_transaction) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    return db.execute(query, [id_vehicule, id_utilisateur, quantite, montant, id_credit]);
  },
  getAllTransactions: () => {
    const query = `
      SELECT 
        t.id,
        t.id_vehicule,
        t.id_utilisateur,
        t.id_credit,
        t.quantite,
        t.montant,
        t.date_transaction,
        v.immatriculation,
        v.marque,
        v.type_vehicule,
        u.username,
        u.email,
        u.numero_telephone,
        u.role,
        c.solde_credit,
        c.credit_utilise
      FROM transactions t
      LEFT JOIN vehicules v ON t.id_vehicule = v.id
      LEFT JOIN utilisateurs u ON t.id_utilisateur = u.id
      LEFT JOIN details_credits c ON t.id_credit = c.id
      ORDER BY t.date_transaction DESC
    `;
    return db.execute(query);
  },

  // Récupérer les transactions par utilisateur
  getTransactionsByUser: (id_utilisateur) => {
    const query = `
      SELECT 
        t.*,
        v.immatriculation,
        v.marque,
        c.reference AS credit_reference
      FROM transactions t
      LEFT JOIN vehicules v ON t.id_vehicule = v.id
      LEFT JOIN details_credits c ON t.id_credit = c.id
      WHERE t.id_utilisateur = ?
      ORDER BY t.date_transaction DESC
    `;
    return db.execute(query, [id_utilisateur]);
  },
  // Récupérer les transactions liées à un crédit
  getTransactionsByCredit: (id_credit) => {
    const query = 'SELECT * FROM transactions WHERE id_credit = ?';
    return db.execute(query, [id_credit]);
  },
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
  
        // VÉRIFICATION QUE LE CRÉDIT UTILISÉ NE DÉPASSE PAS LE SOLDE
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
getTransactionStats: async (id_utilisateur) => {
  const query = `
    SELECT 
      COUNT(*) AS total_transactions,
      SUM(quantite) AS total_quantite,
      SUM(montant) AS total_montant,
      MIN(date_transaction) AS premiere_transaction,
      MAX(date_transaction) AS derniere_transaction
    FROM transactions
    WHERE id_utilisateur = ?
  `;
  return db.execute(query, [id_utilisateur]);
},

// Dernières transactions (pour le dashboard)
getRecentTransactions: async (id_utilisateur, limit = 5) => {
  const query = `
    SELECT 
      t.*,
      v.immatriculation,
      v.marque,
      c.type_credit
    FROM transactions t
    LEFT JOIN vehicules v ON t.id_vehicule = v.id
    LEFT JOIN details_credits c ON t.id_credit = c.id
    WHERE t.id_utilisateur = ?
    ORDER BY t.date_transaction DESC
    LIMIT ?
  `;
  return db.execute(query, [id_utilisateur, limit]);
}
}

export default Transaction;
