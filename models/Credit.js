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
  // Récupérer les crédits d'un utilisateur spécifique
getCreditsByUser: async (id_utilisateur) => {
  const query = `
    SELECT 
      dc.*,
      COUNT(v.id) AS nombre_vehicules,
      SUM(dc.solde_credit - IFNULL(dc.credit_utilise, 0)) AS solde_restant
    FROM details_credits dc
    LEFT JOIN vehicules v ON dc.id = v.id_credit
    WHERE dc.id_utilisateur = ?
    GROUP BY dc.id
    ORDER BY dc.date_debut DESC
  `;
  return db.execute(query, [id_utilisateur]);
},
// Renouveler un crédit
renewCredit: (id_credit, new_solde, new_duree, new_date_debut) => {
  const query = `
    INSERT INTO details_credits (id_utilisateur, type_credit, solde_credit, date_debut, duree_credit, etat)
    SELECT 
      id_utilisateur, 
      type_credit, 
      ?, 
      ?, 
      ?, 
      'actif'
    FROM details_credits 
    WHERE id = ?
  `;
  return db.execute(query, [new_solde, new_date_debut, new_duree, id_credit]);
},
// Statistiques des crédits pour un utilisateur
getCreditStats: async (id_utilisateur) => {
  const query = `
    SELECT 
      COUNT(*) AS total_credits,
     SUM(CASE WHEN etat = 'actif' THEN solde_credit ELSE 0 END) AS total_solde,

      SUM(credit_utilise) AS total_utilise,
      SUM(solde_credit - IFNULL(credit_utilise, 0)) AS solde_restant,
      SUM(CASE WHEN etat = 'actif' THEN 1 ELSE 0 END) AS credits_actifs,
      SUM(CASE WHEN etat = 'expiré' THEN 1 ELSE 0 END) AS credits_expires,
      SUM(CASE WHEN etat = 'annulé' THEN 1 ELSE 0 END) AS credits_annulés
    FROM details_credits
    WHERE id_utilisateur = ?
  `;
  return db.execute(query, [id_utilisateur]);
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
// Statistiques globales des crédits
getGlobalCreditStats: async () => {
  const query = `
    SELECT 
      COUNT(*) AS total_credits,
      SUM(solde_credit) AS total_solde,
      SUM(IFNULL(credit_utilise, 0)) AS total_utilise,
      SUM(
        CASE 
          WHEN etat = 'expiré' THEN solde_credit
          WHEN etat = 'remboursé' THEN 0
          ELSE solde_credit - IFNULL(credit_utilise, 0)
        END
      ) AS solde_restant,
      SUM(CASE WHEN etat = 'actif' THEN 1 ELSE 0 END) AS credits_actifs,
      SUM(CASE WHEN etat = 'expiré' THEN 1 ELSE 0 END) AS credits_expires,
      SUM(CASE WHEN etat = 'remboursé' THEN 1 ELSE 0 END) AS credits_rembourses
    FROM details_credits
  `;
  return db.execute(query);
},
// Crédits avec véhicules associés
getCreditsWithVehicules: async () => {
  const query = `
    SELECT 
      c.id,
      c.type_credit,
      c.solde_credit,
      c.credit_utilise,
      c.etat,
      GROUP_CONCAT(v.immatriculation) AS vehicules,
      COUNT(v.id) AS nombre_vehicules
    FROM details_credits c
    LEFT JOIN vehicules v ON c.id = v.id_credit
    GROUP BY c.id
  `;
  return db.execute(query);
}
};

export default Credit;