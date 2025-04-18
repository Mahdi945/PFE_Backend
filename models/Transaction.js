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
  }
}

export default Transaction;
