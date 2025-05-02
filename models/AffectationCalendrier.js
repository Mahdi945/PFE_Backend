import db from '../config/db.js';

const AffectationCalendrier = {
  addAffectationManuelle: async (pompiste_id, poste_id, pompe_id, date) => {
    // Vérifier si le pompiste est déjà affecté ce jour-là
    const isPompisteAffected = await AffectationCalendrier.checkPompisteAffectation(
      pompiste_id, 
      date, 
      poste_id
    );
    
    if (isPompisteAffected) {
      throw new Error('Ce pompiste est déjà affecté à ce poste pour cette date.');
    }

    // Vérifier si la pompe est déjà occupée ce jour-là
    const isPompeOccupied = await AffectationCalendrier.checkPompeOccupied(
      pompe_id, 
      date, 
      poste_id
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
        // 1. Vérification des affectations existantes
        const [existingAffectations] = await db.execute(
            `SELECT id FROM affectations 
             WHERE MONTH(date) = ? AND YEAR(date) = ?`,
            [mois, annee]
        );

        if (existingAffectations.length > 0 && !regenerate) {
            throw new Error('Les affectations pour ce mois existent déjà. Utilisez la régénération pour les recréer.');
        }

        // 2. Suppression des anciennes affectations en mode régénération
        if (regenerate && existingAffectations.length > 0) {
            await db.execute(
                `DELETE FROM affectations 
                 WHERE MONTH(date) = ? AND YEAR(date) = ?`,
                [mois, annee]
            );
        }

        // 3. Récupération des données de base
        const [pompistes] = await db.execute('SELECT id FROM utilisateurs WHERE role = "pompiste"');
        const [postes] = await db.execute('SELECT id FROM postes');
        const [pompes] = await db.execute('SELECT id FROM pompes');

        if (pompistes.length === 0 || postes.length === 0 || pompes.length === 0) {
            throw new Error('Données insuffisantes (pompistes, postes ou pompes manquants)');
        }

        // 4. Génération des dates strictement dans le mois demandé
        const dates = [];
        const daysInMonth = new Date(annee, mois, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(annee, mois - 1, day);
            dates.push(date.toISOString().split('T')[0]);
        }

        // 5. Algorithme d'affectation équitable
        for (const date of dates) {
            // Vérification de sécurité de la date
            const dateObj = new Date(date);
            if (dateObj.getMonth() + 1 !== mois || dateObj.getFullYear() !== annee) {
                console.error(`Date incohérente générée: ${date}`);
                continue;
            }

            // Pour chaque poste et pompe
            for (const poste of postes) {
                // Mélanger aléatoirement les pompistes
                const shuffledPompistes = [...pompistes].sort(() => Math.random() - 0.5);
                let pompistesAffectes = new Set();

                for (const pompe of pompes) {
                    let affectationReussie = false;

                    // Trouver un pompiste disponible
                    for (const pompiste of shuffledPompistes) {
                        // Vérifier si le pompiste est déjà affecté ce jour
                        const [dejaAffecte] = await db.execute(
                            `SELECT 1 FROM affectations 
                             WHERE pompiste_id = ? AND date = ?`,
                            [pompiste.id, date]
                        );

                        if (dejaAffecte.length === 0) {
                            // Vérifier si la pompe est déjà affectée pour ce poste ce jour
                            const [pompeOccupee] = await db.execute(
                                `SELECT 1 FROM affectations 
                                 WHERE pompe_id = ? AND poste_id = ? AND date = ?`,
                                [pompe.id, poste.id, date]
                            );

                            if (pompeOccupee.length === 0) {
                                // Créer l'affectation
                                await db.execute(
                                    `INSERT INTO affectations 
                                    (pompiste_id, poste_id, pompe_id, date)
                                    VALUES (?, ?, ?, ?)`,
                                    [pompiste.id, poste.id, pompe.id, date]
                                );
                                pompistesAffectes.add(pompiste.id);
                                affectationReussie = true;
                                break;
                            }
                        }
                    }

                    if (!affectationReussie) {
                        throw new Error(`Impossible d'affecter la pompe ${pompe.id} pour le ${date} (poste: ${poste.id})`);
                    }
                }
            }
        }

        return { 
            success: true, 
            message: `Affectations ${regenerate ? 'régénérées' : 'générées'} avec succès pour ${mois}/${annee}`,
            count: dates.length * postes.length * pompes.length
        };

    } catch (error) {
        console.error('Erreur dans la génération des affectations:', {
            mois,
            annee,
            error: error.message
        });
        throw error;
    }
},
  deleteAffectationsByMonthYear: async (mois, annee) => {
    const [result] = await db.execute(
      `DELETE FROM affectations
       WHERE MONTH(date) = ? AND YEAR(date) = ?`,
      [mois, annee]
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
      console.log('Début de la mise à jour - Données reçues:', {id, updates});
  
      // Validation des données
      if (!id) throw new Error('ID de l\'affectation manquant');
      if (!updates) throw new Error('Données de mise à jour manquantes');
  
      // Récupérer l'affectation actuelle
      const [currentAffectation] = await db.execute(
        'SELECT * FROM affectations WHERE id = ?', 
        [id]
      );
      
      if (currentAffectation.length === 0) {
        throw new Error('Affectation introuvable.');
      }
  
      const current = currentAffectation[0];
      console.log('Affectation actuelle:', current);
  
      // Convertir les noms en IDs
      const getIds = async () => {
        if (updates.pompiste) {
          const [result] = await db.execute('SELECT id FROM utilisateurs WHERE username = ?', [updates.pompiste]);
          if (result.length === 0) throw new Error(`Pompiste "${updates.pompiste}" introuvable.`);
          updates.pompiste_id = result[0].id;
        }
        
        if (updates.numero_pompe) {
          const [result] = await db.execute('SELECT id FROM pompes WHERE numero_pompe = ?', [updates.numero_pompe]);
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
          affectedRows: result.affectedRows 
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
  if (currentHour >= 14 && currentHour < 22) poste_id = 2; // Après-midi
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
    throw new Error('Erreur lors de la récupération de l\'historique');
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