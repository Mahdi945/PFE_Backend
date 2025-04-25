import db from '../config/db.js';


  const Paiments = {
    create: async (id_credit, id_utilisateur, montant_paye, mode_paiement, description = '') => {
      let connection;
      try {
        // Obtenir une connexion dédiée pour la transaction
        connection = await db.getConnection();
        
        // Désactiver les prepared statements pour cette connexion
        await connection.query({ sql: 'SET SESSION sql_mode = "NO_ENGINE_SUBSTITUTION"', rowsAsArray: true });
        
        // Commencer la transaction (sans prepared statement)
        await connection.query('START TRANSACTION');

        // Validation
        if (montant_paye <= 0) {
          throw new Error('Le montant doit être positif');
        }

        // 1. Récupération des infos du crédit
        const [creditRows] = await connection.query(
          `SELECT solde_credit, montant_restant, etat 
           FROM details_credits WHERE id = ?`, 
          [id_credit]
        );
        
        if (!creditRows.length) throw new Error('Crédit non trouvé');
        
        const credit = creditRows[0];
        const soldeInitial = parseFloat(credit.solde_credit);
        const montantRestantActuel = parseFloat(credit.montant_restant);

        // 2. Calcul des nouveaux montants
        const nouveauMontantRestant = montantRestantActuel - parseFloat(montant_paye);

        if (nouveauMontantRestant < 0) {
          await connection.query('ROLLBACK');
          throw new Error('Le paiement dépasse le solde restant');
        }

        // 3. Génération référence
        const reference = `PAY-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

        // 4. Insertion paiement
        const [result] = await connection.query(
          `INSERT INTO paiements_credits 
           (id_credit, id_utilisateur, montant_paye, montant_restant, date_paiement, mode_paiement, reference_paiement, description)
           VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)`,
          [id_credit, id_utilisateur, montant_paye, nouveauMontantRestant, mode_paiement, reference, description]
        );

        // 5. Mise à jour crédit (sans modifier credit_utilise)
        const nouvelEtat = nouveauMontantRestant <= 0 ? 'remboursé' : credit.etat;
        
        const [updateResult] = await connection.query(
          `UPDATE details_credits 
           SET 
             montant_restant = ?,
             etat = ?,
             date_dernier_paiement = NOW()
           WHERE id = ?`,
          [nouveauMontantRestant, nouvelEtat, id_credit]
        );

        if (updateResult.affectedRows === 0) {
          await connection.query('ROLLBACK');
          throw new Error('Échec mise à jour crédit');
        }

        await connection.query('COMMIT');
        return {
          id: result.insertId,
          reference,
          montant_restant: nouveauMontantRestant,
          etat: nouvelEtat
        };

      } catch (err) {
        if (connection) {
          await connection.query('ROLLBACK');
        }
        console.error('Erreur création paiement:', err);
        throw err;
      } finally {
        if (connection) {
          connection.release();
        }
      }
    },
    getAll: async () => {
      try {
          const [rows] = await db.execute(
              `SELECT 
                  p.id,
                  p.id_credit,
                  p.id_utilisateur,
                  p.montant_paye,
                  p.montant_restant,
                  p.date_paiement,
                  p.mode_paiement,
                  p.reference_paiement,
                  p.description,
                  u.username,
                  c.type_credit,
                  c.solde_credit as solde_initial
               FROM paiements_credits p
               JOIN utilisateurs u ON p.id_utilisateur = u.id
               JOIN details_credits c ON p.id_credit = c.id
               ORDER BY p.date_paiement DESC`
          );
  
          // Formatage standardisé des données
          return rows.map(row => ({
              id: row.id,
              id_credit: row.id_credit,
              id_utilisateur: row.id_utilisateur,
              montant_paye: parseFloat(row.montant_paye),
              montant_restant: parseFloat(row.montant_restant),
              date_paiement: new Date(row.date_paiement).toISOString(),
              mode_paiement: row.mode_paiement,
              reference_paiement: row.reference_paiement,
              description: row.description || null,
              username: row.username,
              type_credit: row.type_credit,
              solde_initial: parseFloat(row.solde_initial)
          }));
      } catch (err) {
          console.error('Erreur dans Paiments.getAll:', err);
          throw err;
      }
  },

  getByCredit: async (id_credit) => {
    const [rows] = await db.execute(
      `SELECT p.*, u.username 
       FROM paiements_credits p
       JOIN utilisateurs u ON p.id_utilisateur = u.id
       WHERE p.id_credit = ?
       ORDER BY p.date_paiement DESC`,
      [id_credit]
    );
    return rows;
  },

  getByUser: async (id_utilisateur) => {
    const [rows] = await db.execute(
      `SELECT p.*, c.type_credit, c.solde_credit as credit_initial
       FROM paiements_credits p
       JOIN details_credits c ON p.id_credit = c.id
       WHERE p.id_utilisateur = ?
       ORDER BY p.date_paiement DESC`,
      [id_utilisateur]
    );
    return rows;
  },

  getByReference: async (reference) => {
    const [rows] = await db.execute(
      `SELECT p.*, u.username, c.type_credit
       FROM paiements_credits p
       JOIN utilisateurs u ON p.id_utilisateur = u.id
       JOIN details_credits c ON p.id_credit = c.id
       WHERE p.reference_paiement = ?`,
      [reference]
    );
    return rows[0];
  },
  // Statistiques de paiements pour un utilisateur
getPaymentStats: async (id_utilisateur) => {
  const query = `
    SELECT 
      COUNT(*) AS total_paiements,
      SUM(montant_paye) AS total_paye,
      MIN(date_paiement) AS premier_paiement,
      MAX(date_paiement) AS dernier_paiement
    FROM paiements_credits
    WHERE id_utilisateur = ?
  `;
  return db.execute(query, [id_utilisateur]);
},

// Derniers paiements (pour le dashboard)
getRecentPayments: async (id_utilisateur, limit = 5) => {
  const query = `
    SELECT 
      p.*,
      c.type_credit
    FROM paiements_credits p
    JOIN details_credits c ON p.id_credit = c.id
    WHERE p.id_utilisateur = ?
    ORDER BY p.date_paiement DESC
    LIMIT ?
  `;
  return db.execute(query, [id_utilisateur, limit]);
},
};

export default Paiments;