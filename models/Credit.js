import db from '../config/db.js';

const Credit = {
  // Ajouter un crédit
  addCredit: (id_utilisateur, type_credit, solde_credit, date_debut, duree_credit) => {
    const query = `
      INSERT INTO details_credits (id_utilisateur, type_credit, solde_credit, date_debut, duree_credit, etat) 
      VALUES (?, ?, ?, ?, ?, 'actif')
    `;
    return db.execute(query, [id_utilisateur, type_credit, solde_credit, date_debut, duree_credit]);
  },

  // Récupérer tous les crédits avec le username
  getAllCredits: () => {
    const query = `
      SELECT 
        dc.id, 
        u.username AS utilisateur, 
        dc.type_credit, 
        dc.solde_credit, 
        dc.date_debut, 
        dc.duree_credit, 
        dc.credit_utilise, 
        dc.etat
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
    `;
    return db.execute(query);
  },

  // Récupérer un crédit par ID
  getCreditById: (id_credit) => {
    const query = `
      SELECT 
        dc.id, 
        u.username AS utilisateur, 
        dc.type_credit, 
        dc.solde_credit, 
        dc.date_debut, 
        dc.duree_credit, 
        dc.credit_utilise, 
        dc.etat
      FROM details_credits dc
      JOIN utilisateurs u ON dc.id_utilisateur = u.id
      WHERE dc.id = ?
    `;
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
        const creditUtilise = credit.credit_utilise || 0;

        // Vérifier si le montant est inférieur ou égal au solde du crédit restant
        if (soldeCredit - creditUtilise < montant) {
          throw new Error('Le montant dépasse le solde restant du crédit');
        }

        // Mettre à jour le solde du crédit et l'attribut credit_utilise
        const query = `
          UPDATE details_credits 
          SET credit_utilise = credit_utilise + ? 
          WHERE id = ?
        `;
        return db.execute(query, [montant, montant, id_credit]);
      });
  },

  // Mettre à jour l'état d'un crédit
  updateCreditState: (id_credit, etat) => {
    const query = `
      UPDATE details_credits
      SET etat = ?
      WHERE id = ?
    `;
    return db.execute(query, [etat, id_credit]);
  },

  // Mettre à jour automatiquement l'état des crédits expirés
  updateExpiredCredits: () => {
    const query = `
      UPDATE details_credits
      SET etat = 'expiré'
      WHERE etat = 'actif' AND DATE_ADD(date_debut, INTERVAL duree_credit DAY) < NOW()
    `;
    return db.execute(query);
  },
};

export default Credit;