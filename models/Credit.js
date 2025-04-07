import db from '../config/db.js';

const Credit = {
  // Ajouter un crédit
  addCredit: (id_utilisateur, type_credit, solde_credit, date_debut, duree_credit) => {
    const query = `
      INSERT INTO details_credits (id_utilisateur, type_credit, solde_credit, date_debut, duree_credit) 
      VALUES (?, ?, ?, ?, ?)
    `;
    return db.execute(query, [id_utilisateur, type_credit, solde_credit, date_debut, duree_credit]);
  },

  // Récupérer tous les crédits
  getAllCredits: () => {
    const query = 'SELECT * FROM details_credits';
    return db.execute(query);
  },

  // Récupérer un crédit par ID
  getCreditById: (id_credit) => {
    const query = 'SELECT * FROM details_credits WHERE id = ?';
    return db.execute(query, [id_credit]);
  },

  // Mettre à jour le solde du crédit après une transaction
  updateCredit: (id_credit, montant) => {
    return db.execute('SELECT * FROM details_credits WHERE id = ?', [id_credit])
      .then(([rows]) => {
        if (rows.length === 0) {
          throw new Error('Crédit introuvable');
        }

        const credit = rows[0];
        const soldeCredit = credit.solde_credit;
        const creditUtilise = credit.credit_utilise || 0; // Si credit_utilise n'est pas défini, on le initialise à 0

        // Vérifier si le montant est inférieur ou égal au solde du crédit restant
        if (soldeCredit - creditUtilise < montant) {
          throw new Error('Le montant dépasse le solde restant du crédit');
        }

        // Mettre à jour le solde du crédit et l'attribut credit_utilise
        const query = `
          UPDATE details_credits 
          SET solde_credit = solde_credit - ?, credit_utilise = credit_utilise + ? 
          WHERE id = ?
        `;
        return db.execute(query, [montant, montant, id_credit]);
      });
  }
};

export default Credit;
