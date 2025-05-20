import db from '../config/db.js';

const AffectationCalendrier = {
  addAffectationManuelle: async (pompiste_id, poste_id, pompe_id, date) => {
    // Vérifier si le pompiste est déjà affecté ce jour-là
    const isPompisteAffected = await AffectationCalendrier.checkPompisteAffectation(
      pompiste_id,
      date,
      poste_id,
    );

    if (isPompisteAffected) {
      throw new Error('Ce pompiste est déjà affecté à ce poste pour cette date.');
    }

    // Vérifier si la pompe est déjà occupée ce jour-là
    const isPompeOccupied = await AffectationCalendrier.checkPompeOccupied(
      pompe_id,
      date,
      poste_id,
    );

    if (isPompeOccupied) {
      throw new Error('Cette pompe est déjà occupée pour cette date.');
    }

    const query = `
      INSERT INTO affectations (pompiste_id, poste_id, pompe_id, date, statut)
      VALUES (?, ?, ?, ?, 'occupé')
    `;
    return db.execute(query, [pompiste_id, poste_id, pompe_id, date]);
  },

  checkPompisteAffectation: async (pompiste_id, date, poste_id) => {
    const query = `
      SELECT COUNT(*) AS count 
      FROM affectations 
      WHERE pompiste_id = ? 
      AND date = ? 
      AND poste_id = ?
    `;
    const [rows] = await db.execute(query, [pompiste_id, date, poste_id]);
    return rows[0].count > 0;
  },

  checkPompeOccupied: async (pompe_id, date, poste_id) => {
    const query = `
      SELECT COUNT(*) AS count 
      FROM affectations 
      WHERE pompe_id = ? 
      AND date = ? 
      AND poste_id = ?
    `;
    const [rows] = await db.execute(query, [pompe_id, date, poste_id]);
    return rows[0].count > 0;
  },

addAffectationAutomatiqueEquitable: async (mois, annee, regenerate = false) => {
    try {
      // Validation robuste des paramètres
      mois = parseInt(mois);
      annee = parseInt(annee);
      
      if (isNaN(mois) || isNaN(annee) || mois < 1 || mois > 12) {
        throw new Error('Paramètres invalides : mois (1-12) et année requis');
      }

      // 1. Vérification des affectations existantes
      const [existingAffectations] = await db.execute(
        `SELECT id FROM affectations 
         WHERE MONTH(date) = ? AND YEAR(date) = ?`,
        [mois, annee],
      );

      if (existingAffectations.length > 0 && !regenerate) {
        throw new Error(
          'Affectations existantes. Utilisez regenerate=true pour les recréer.',
        );
      }

      // 2. Nettoyage des anciennes affectations
      if (regenerate) {
        await db.execute(
          `DELETE FROM affectations 
           WHERE MONTH(date) = ? AND YEAR(date) = ?`,
          [mois, annee],
        );
      }

      // 3. Récupération des données nécessaires
      const [pompistes] = await db.execute(
        'SELECT id FROM utilisateurs WHERE role = "pompiste" AND status = "active"'
      );
      const [postes] = await db.execute('SELECT id FROM postes');
      const [pompes] = await db.execute(
        'SELECT id FROM pompes WHERE statut = "en_service"'
      );

      if (pompistes.length === 0 || postes.length === 0 || pompes.length === 0) {
        throw new Error('Données insuffisantes pour générer les affectations');
      }

      // 4. Génération CORRECTE des dates (solution finale)
      const dates = [];
      const dernierJourDuMois = new Date(annee, mois, 0).getDate();

      // Fonction de formatage de date fiable
      const formatDate = (year, month, day) => {
        const date = new Date(year, month - 1, day);
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      };

      for (let day = 1; day <= dernierJourDuMois; day++) {
        dates.push(formatDate(annee, mois, day));
      }

      console.log(`Génération STRICTE pour ${mois}/${annee} : ${dates[0]} à ${dates[dates.length - 1]}`);

      // 5. Algorithme d'affectation optimisé
      let totalAffectations = 0;
      const affectationsParPompiste = new Map(pompistes.map(p => [p.id, 0]));

      for (const date of dates) {
        for (const poste of postes) {
          // Priorité aux pompistes les moins affectés
          const pompistesTries = [...pompistes].sort((a, b) => 
            affectationsParPompiste.get(a.id) - affectationsParPompiste.get(b.id));

          for (const pompe of pompes) {
            let affectationReussie = false;

            for (const pompiste of pompistesTries) {
              try {
                // Vérification double disponibilité
                const [disponibilite] = await db.execute(
                  `SELECT 1 FROM affectations 
                   WHERE pompiste_id = ? AND date = ? 
                   OR (pompe_id = ? AND poste_id = ? AND date = ?)`,
                  [pompiste.id, date, pompe.id, poste.id, date]
                );

                if (disponibilite.length === 0) {
                  await db.execute(
                    `INSERT INTO affectations 
                     (pompiste_id, poste_id, pompe_id, date)
                     VALUES (?, ?, ?, ?)`,
                    [pompiste.id, poste.id, pompe.id, date],
                  );
                  
                  affectationsParPompiste.set(pompiste.id, affectationsParPompiste.get(pompiste.id) + 1);
                  totalAffectations++;
                  affectationReussie = true;
                  break;
                }
              } catch (err) {
                console.error(`Erreur lors de l'affectation`, err);
              }
            }

            if (!affectationReussie) {
              console.warn(`Affectation impossible le ${date} pour pompe ${pompe.id} (poste ${poste.id})`);
            }
          }
        }
      }

      // Vérification finale robuste
      const verification = await db.execute(
        `SELECT 
          MIN(date) as premier_jour,
          MAX(date) as dernier_jour,
          COUNT(*) as total
         FROM affectations
         WHERE MONTH(date) = ? AND YEAR(date) = ?`,
        [mois, annee]
      );

      return {
        success: true,
        message: `Affectations générées avec succès pour ${mois}/${annee}`,
        stats: {
          jours: dates.length,
          premier_jour: dates[0],
          dernier_jour: dates[dates.length - 1],
          total_affectations: totalAffectations,
          verification_bdd: verification[0][0],
          repartition: Object.fromEntries(affectationsParPompiste)
        }
      };
    } catch (error) {
      console.error('Échec de la génération:', {
        params: { mois, annee, regenerate },
        error: error.message
      });
      throw new Error(`Échec de la génération: ${error.message}`);
    }
  },
  deleteAffectationsByMonthYear: async (mois, annee) => {
    const [result] = await db.execute(
      `DELETE FROM affectations
       WHERE MONTH(date) = ? AND YEAR(date) = ?`,
      [mois, annee],
    );
    return result;
  },

  getAffectationsByDate: async (date) => {
    const query = `
      SELECT 
        a.id AS affectation_id,
        u.username AS pompiste,
        p.numero_pompe,
        po.nom AS poste,
        a.date,
        p.id AS pompe_id,
        po.heure_debut,
        po.heure_fin
      FROM affectations a
      JOIN utilisateurs u ON a.pompiste_id = u.id
      JOIN pompes p ON a.pompe_id = p.id
      JOIN postes po ON a.poste_id = po.id
      WHERE a.date = ?
    `;
    const [rows] = await db.execute(query, [date]);
    return rows;
  },

  getAffectationsByMonthYear: async (mois, annee) => {
    const query = `
      SELECT 
        a.id AS affectation_id,
        u.username AS pompiste,
        p.numero_pompe,
        po.nom AS poste,
        a.date,
        po.heure_debut
      FROM affectations a
      JOIN utilisateurs u ON a.pompiste_id = u.id
      JOIN pompes p ON a.pompe_id = p.id
      JOIN postes po ON a.poste_id = po.id
      WHERE MONTH(a.date) = ? AND YEAR(a.date) = ?
      ORDER BY a.date
    `;
    const [rows] = await db.execute(query, [mois, annee]);
    return rows;
  },

  updateAffectation: async (id, updates) => {
    try {
      console.log('Début de la mise à jour - Données reçues:', { id, updates });

      // Validation des données
      if (!id) throw new Error("ID de l'affectation manquant");
      if (!updates) throw new Error('Données de mise à jour manquantes');

      // Récupérer l'affectation actuelle
      const [currentAffectation] = await db.execute('SELECT * FROM affectations WHERE id = ?', [
        id,
      ]);

      if (currentAffectation.length === 0) {
        throw new Error('Affectation introuvable.');
      }

      const current = currentAffectation[0];
      console.log('Affectation actuelle:', current);

      // Convertir les noms en IDs
      const getIds = async () => {
        if (updates.pompiste) {
          const [result] = await db.execute('SELECT id FROM utilisateurs WHERE username = ?', [
            updates.pompiste,
          ]);
          if (result.length === 0) throw new Error(`Pompiste "${updates.pompiste}" introuvable.`);
          updates.pompiste_id = result[0].id;
        }

        if (updates.numero_pompe) {
          const [result] = await db.execute('SELECT id FROM pompes WHERE numero_pompe = ?', [
            updates.numero_pompe,
          ]);
          if (result.length === 0) throw new Error(`Pompe "${updates.numero_pompe}" introuvable.`);
          updates.pompe_id = result[0].id;
        }

        if (updates.poste) {
          const [result] = await db.execute('SELECT id FROM postes WHERE nom = ?', [updates.poste]);
          if (result.length === 0) throw new Error(`Poste "${updates.poste}" introuvable.`);
          updates.poste_id = result[0].id;
        }
      };

      await getIds();

      // Démarrer une transaction
      const connection = await db.getConnection();
      await connection.beginTransaction();

      try {
        // Construction de la requête de mise à jour
        const fields = [];
        const values = [];

        if (updates.pompiste_id !== undefined) {
          fields.push('pompiste_id = ?');
          values.push(updates.pompiste_id);
        }
        if (updates.pompe_id !== undefined) {
          fields.push('pompe_id = ?');
          values.push(updates.pompe_id);
        }
        if (updates.poste_id !== undefined) {
          fields.push('poste_id = ?');
          values.push(updates.poste_id);
        }
        if (updates.date !== undefined) {
          fields.push('date = ?');
          values.push(updates.date);
        }

        if (fields.length === 0) {
          throw new Error('Aucun champ valide à mettre à jour.');
        }

        const query = `UPDATE affectations SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        console.log('Requête SQL:', query);
        console.log('Valeurs:', values);

        // Exécution de la mise à jour
        const [result] = await connection.execute(query, values);
        console.log('Résultat de la mise à jour:', result);

        await connection.commit();
        connection.release();

        return {
          success: true,
          message: 'Affectation mise à jour avec succès.',
          affectedRows: result.affectedRows,
        };
      } catch (error) {
        await connection.rollback();
        connection.release();
        console.error('Erreur lors de la transaction:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur dans updateAffectation:', error);
      throw error;
    }
  },

  // Modifiez la méthode getCurrentAffectation comme suit :
  getCurrentAffectation: async (pompiste_id) => {
    const now = new Date();
    const currentHour = now.getHours();

    let poste_id = 1; // Matin par défaut
    if (currentHour >= 14 && currentHour < 22)
      poste_id = 2; // Après-midi
    else if (currentHour >= 22 || currentHour < 6) poste_id = 3; // Nuit

    let queryDate = formatDate(now);
    if (currentHour < 6) {
      // Pour le poste de nuit qui commence la veille à 22h
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      queryDate = formatDate(yesterday);
    }

    const query = `
    SELECT 
      a.id AS affectation_id,
      a.pompiste_id,
      a.poste_id,
      a.pompe_id,
      a.date,
      u.username AS pompiste,
      p.numero_pompe,
      po.nom AS poste,
      po.heure_debut,
      po.heure_fin
    FROM affectations a
    JOIN utilisateurs u ON a.pompiste_id = u.id
    JOIN pompes p ON a.pompe_id = p.id
    JOIN postes po ON a.poste_id = po.id
    WHERE a.pompiste_id = ? 
    AND a.date = ?
    AND a.poste_id = ?
    LIMIT 1
  `;

    try {
      const [rows] = await db.execute(query, [pompiste_id, queryDate, poste_id]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error('Error in getCurrentAffectation:', error);
      throw error;
    }
  },
  // Ajoutez cette méthode pour récupérer l'historique des relevés
  getHistoriqueReleves: async (pistolet_id, date_debut, date_fin) => {
    const query = `
    SELECT 
      id,
      index_ouverture,
      index_fermeture,
      date_heure_saisie
    FROM releves_postes
    WHERE pistolet_id = ?
    AND DATE(date_heure_saisie) BETWEEN ? AND ?
    ORDER BY date_heure_saisie DESC
  `;

    try {
      const [rows] = await db.execute(query, [pistolet_id, date_debut, date_fin]);
      return rows;
    } catch (error) {
      console.error('Error in getHistoriqueReleves:', error);
      throw new Error("Erreur lors de la récupération de l'historique");
    }
  },

  getAvailablePistoletsByAffectation: async (affectation_id) => {
    const query = `
      SELECT pt.* 
      FROM pistolets pt
      JOIN pompes p ON pt.pompe_id = p.id
      JOIN affectations a ON p.id = a.pompe_id
      WHERE a.id = ? 
      AND pt.statut = 'disponible'
    `;
    const [rows] = await db.execute(query, [affectation_id]);
    return rows;
  },
};

function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default AffectationCalendrier;
