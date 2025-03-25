import db from '../config/db.js';

const Contrat = {
  // Ajouter un contrat
  addContrat: (id_utilisateur, type_contrat, solde_credit, date_debut, duree_contrat) => {
    const query = `
      INSERT INTO contrats (id_utilisateur, type_contrat, solde_credit, date_debut, duree_contrat) 
      VALUES (?, ?, ?, ?, ?)
    `;
    return db.execute(query, [id_utilisateur, type_contrat, solde_credit, date_debut, duree_contrat]);
  },

  // Récupérer tous les contrats
  getAllContrats: () => {
    const query = 'SELECT * FROM contrats';
    return db.execute(query);
  },
   // Vérifier si un contrat existe par son ID
   getContratById: (id_contrat) => {
    const query = 'SELECT * FROM contrats WHERE id = ?';
    return db.execute(query, [id_contrat]);
  },

  // Mettre à jour le solde du contrat après une transaction
  updateCredit: (id, montant) => {
    const query = `UPDATE contrats SET solde_credit = solde_credit - ? WHERE id = ?`;
    return db.execute(query, [montant, id]);
  }
};

export default Contrat;
