import db from '../config/db.js';

const Transaction = {
  // Ajouter une transaction
  addTransaction: (id_vehicule, id_utilisateur, quantite, montant, id_contrat) => {
    const query = `
      INSERT INTO transactions (id_vehicule, id_utilisateur, quantite, montant, id_contrat, date_transaction) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    return db.execute(query, [id_vehicule, id_utilisateur, quantite, montant, id_contrat]);
  },

  // Récupérer les transactions liées à un contrat
  getTransactionsByContrat: (id_contrat) => {
    const query = 'SELECT * FROM transactions WHERE id_contrat = ?';
    return db.execute(query, [id_contrat]);
  }
};

export default Transaction;
