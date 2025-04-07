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
  }
};

export default Transaction;
