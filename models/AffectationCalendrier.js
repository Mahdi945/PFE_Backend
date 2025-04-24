import db from '../config/db.js';

const AffectationCalendrier = {
  // ➕ Ajouter une affectation manuelle
  addAffectationManuelle: async (pompiste_id, poste_id, pompe_id, calendrier_id) => {
    const query = `
      INSERT INTO affectations (pompiste_id, poste_id, pompe_id, calendrier_id, statut)
      VALUES (?, ?, ?, ?, 'occupé')
    `;
    return db.execute(query, [pompiste_id, poste_id, pompe_id, calendrier_id]);
  },

  checkPompisteAffectation: async (pompiste_id, calendrier_id, poste_id) => {
    const query = `
      SELECT COUNT(*) AS count 
      FROM affectations 
      WHERE pompiste_id = ? 
      AND calendrier_id = ? 
      AND poste_id = ?
    `;
    const [rows] = await db.execute(query, [pompiste_id, calendrier_id, poste_id]);
    return rows[0].count > 0;
  },

  // Vérifier si une pompe est déjà occupée dans un créneau
  checkPompeOccupied: async (pompe_id, calendrier_id, poste_id) => {
    const query = `
      SELECT COUNT(*) AS count 
      FROM affectations 
      WHERE pompe_id = ? 
      AND calendrier_id = ? 
      AND poste_id = ?
    `;
    const [rows] = await db.execute(query, [pompe_id, calendrier_id, poste_id]);
    return rows[0].count > 0;
  },

  // Ajouter une affectation manuelle avec vérifications
  addAffectationManuelle: async (pompiste_id, poste_id, pompe_id, calendrier_id) => {
    // Vérifier si le pompiste est déjà affecté à ce poste dans ce créneau
    const isPompisteAffected = await AffectationCalendrier.checkPompisteAffectation(
      pompiste_id, 
      calendrier_id, 
      poste_id
    );
    
    if (isPompisteAffected) {
      throw new Error('Ce pompiste est déjà affecté à ce poste pour ce créneau.');
    }

    // Vérifier si la pompe est déjà occupée dans ce créneau
    const isPompeOccupied = await AffectationCalendrier.checkPompeOccupied(
      pompe_id, 
      calendrier_id, 
      poste_id
    );
    
    if (isPompeOccupied) {
      throw new Error('Cette pompe est déjà occupée pour ce créneau.');
    }

    const query = `
      INSERT INTO affectations (pompiste_id, poste_id, pompe_id, calendrier_id, statut)
      VALUES (?, ?, ?, ?, 'occupé')
    `;
    return db.execute(query, [pompiste_id, poste_id, pompe_id, calendrier_id]);
  },

// Génération automatique avec contraintes
addAffectationAutomatiqueEquitable: async (mois, annee, regenerate = false) => {
  try {
    // Vérifier si des affectations existent déjà pour ce mois
    const [existingAffectations] = await db.execute(
      `SELECT * FROM affectations a
       JOIN calendrier c ON a.calendrier_id = c.id
       WHERE c.mois = ? AND c.annee = ?`,
      [mois, annee]
    );

    if (existingAffectations.length > 0 && !regenerate) {
      throw new Error('Les affectations automatiques pour ce mois existent déjà.');
    }

    // Si en mode régénération, supprimer les anciennes affectations
    if (regenerate && existingAffectations.length > 0) {
      await AffectationCalendrier.deleteAffectationsByMonthYear(mois, annee);
    }

    // Récupérer les données nécessaires
    const [pompistes] = await db.execute('SELECT id FROM utilisateurs WHERE role = "pompiste"');
    const [postes] = await db.execute('SELECT * FROM postes');
    const [pompes] = await db.execute('SELECT * FROM pompes');

    // Créer le calendrier s'il n'existe pas
    const [calendrierExist] = await db.execute(
      'SELECT * FROM calendrier WHERE mois = ? AND annee = ?',
      [mois, annee]
    );

    if (!calendrierExist.length) {
      const dateEnd = new Date(annee, mois, 0);
      for (let day = 1; day <= dateEnd.getDate(); day++) {
        const date = new Date(annee, mois - 1, day);
        await db.execute(
          'INSERT INTO calendrier (date, statut, mois, annee) VALUES (?, "disponible", ?, ?)',
          [date, mois, annee]
        );
      }
    }

    // Récupérer les jours du calendrier
    const [calendriers] = await db.execute(
      'SELECT * FROM calendrier WHERE mois = ? AND annee = ? ORDER BY date',
      [mois, annee]
    );

    // Algorithme d'affectation équitable
    for (const jour of calendriers) {
      for (const poste of postes) {
        const shuffledPompistes = [...pompistes].sort(() => 0.5 - Math.random());

        for (const pompe of pompes) {
          let affectationValide = false;
          let tentative = 0;

          while (!affectationValide && tentative < shuffledPompistes.length) {
            const pompiste = shuffledPompistes[tentative];

            // ✅ Vérifier que le pompiste n'est affecté à aucun poste ce jour-là
            const [dejaAffecteCeJour] = await db.execute(
              `SELECT 1 FROM affectations 
               WHERE pompiste_id = ? AND calendrier_id = ?`,
              [pompiste.id, jour.id]
            );

            if (dejaAffecteCeJour.length === 0) {
              // Vérifier que la pompe n'est pas déjà affectée pour ce poste ce jour-là
              const pompeOccupee = await AffectationCalendrier.checkPompeOccupied(
                pompe.id,
                jour.id,
                poste.id
              );

              if (!pompeOccupee) {
                await db.execute(
                  `INSERT INTO affectations (pompiste_id, poste_id, pompe_id, calendrier_id)
                   VALUES (?, ?, ?, ?)`,
                  [pompiste.id, poste.id, pompe.id, jour.id]
                );
                affectationValide = true;
              }
            }

            tentative++;
          }

          if (!affectationValide) {
            throw new Error(`Impossible d'affecter toutes les pompes pour le ${jour.date} (poste: ${poste.nom})`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Erreur dans addAffectationAutomatiqueEquitable:', error);
    throw error;
  }
},

// Supprimer les affectations d'un mois/année
deleteAffectationsByMonthYear: async (mois, annee) => {
  const [result] = await db.execute(
    `DELETE a FROM affectations a
     JOIN calendrier c ON a.calendrier_id = c.id
     WHERE c.mois = ? AND c.annee = ?`,
    [mois, annee]
  );
  return result;
},
  // 📆 Obtenir les affectations d'un jour spécifique
  getAffectationsByJour: async (calendrier_id) => {
    const query = `
      SELECT 
        a.id AS affectation_id,
        u.username AS pompiste,
        p.numero_pompe,
        po.nom AS poste,
        c.date,
        a.calendrier_id,
        p.id AS pompe_id,
        po.heure_debut,
        po.heure_fin
      FROM affectations a
      JOIN utilisateurs u ON a.pompiste_id = u.id
      JOIN pompes p ON a.pompe_id = p.id
      JOIN postes po ON a.poste_id = po.id
      JOIN calendrier c ON a.calendrier_id = c.id
      WHERE a.calendrier_id = ?
    `;
    const [rows] = await db.execute(query, [calendrier_id]);
    return rows;
  },

  // 📅 Obtenir les affectations d’un mois/année
  getAffectationsByMonthYear: async (mois, annee) => {
    const query = `
      SELECT 
        a.id AS affectation_id,
        u.username AS pompiste,
        p.numero_pompe,
        po.nom AS poste,
        c.date
      FROM affectations a
      JOIN utilisateurs u ON a.pompiste_id = u.id
      JOIN pompes p ON a.pompe_id = p.id
      JOIN postes po ON a.poste_id = po.id
      JOIN calendrier c ON a.calendrier_id = c.id
      WHERE c.mois = ? AND c.annee = ?
    `;
    const [rows] = await db.execute(query, [mois, annee]);
    return rows;
  },

  updateAffectation: async (id, updates) => {
    try {
      // Récupérer l'affectation actuelle
      const [currentAffectation] = await db.execute(
        'SELECT * FROM affectations WHERE id = ?', 
        [id]
      );
      
      if (currentAffectation.length === 0) {
        throw new Error('Affectation introuvable.');
      }
  
      const current = currentAffectation[0];
      const calendrier_id = updates.calendrier_id || current.calendrier_id;
      const poste_id = updates.poste_id || current.poste_id;
  
      // Convertir les noms en IDs si nécessaire
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
  
      // Démarrer une transaction pour garantir l'intégrité des données
      const connection = await db.getConnection();
      await connection.beginTransaction();
  
      try {
        // Cas 1: Changement de pompiste seulement
        if (updates.pompiste_id && !updates.pompe_id && !updates.poste_id) {
          // Vérifier si le nouveau pompiste est déjà affecté à un autre poste ce jour-là
          const [existingAffectation] = await connection.execute(
            `SELECT id FROM affectations 
             WHERE pompiste_id = ? AND calendrier_id = ?`,
            [updates.pompiste_id, calendrier_id]
          );
  
          if (existingAffectation.length > 0) {
            // Échanger les affectations entre les deux pompistes
            await connection.execute(
              `UPDATE affectations 
               SET pompiste_id = ?
               WHERE id = ?`,
              [current.pompiste_id, existingAffectation[0].id]
            );
          }
        }
        
        // Cas 2: Changement de pompe seulement
        if (updates.pompe_id && !updates.pompiste_id && !updates.poste_id) {
          // Vérifier si la nouvelle pompe est déjà affectée à un autre pompiste ce jour-là
          const [existingAffectation] = await connection.execute(
            `SELECT id, pompiste_id FROM affectations 
             WHERE pompe_id = ? AND calendrier_id = ? AND poste_id = ?`,
            [updates.pompe_id, calendrier_id, poste_id]
          );
  
          if (existingAffectation.length > 0) {
            // Échanger les pompes entre les deux affectations
            await connection.execute(
              `UPDATE affectations 
               SET pompe_id = ?
               WHERE id = ?`,
              [current.pompe_id, existingAffectation[0].id]
            );
          }
        }
        
        // Cas 3: Changement de poste seulement
        if (updates.poste_id && !updates.pompiste_id && !updates.pompe_id) {
          // Vérifier si le pompiste est déjà affecté à un autre poste ce jour-là
          const [existingAffectation] = await connection.execute(
            `SELECT id, poste_id, pompe_id FROM affectations 
             WHERE pompiste_id = ? AND calendrier_id = ?`,
            [current.pompiste_id, calendrier_id]
          );
  
          if (existingAffectation.length > 0) {
            // Échanger les postes entre les deux affectations
            await connection.execute(
              `UPDATE affectations 
               SET poste_id = ?
               WHERE id = ?`,
              [current.poste_id, existingAffectation[0].id]
            );
          }
        }
  
       
  
        // Mettre à jour l'affectation courante avec les nouveaux valeurs
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
        if (updates.calendrier_id !== undefined) {
          fields.push('calendrier_id = ?');
          values.push(updates.calendrier_id);
        }
  
        if (fields.length === 0) {
          throw new Error('Aucun champ valide à mettre à jour.');
        }
  
        const query = `UPDATE affectations SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);
        await connection.execute(query, values);
  
        // Valider la transaction
        await connection.commit();
        connection.release();
  
        return { success: true, message: 'Affectation mise à jour avec succès.' };
      } catch (error) {
        // En cas d'erreur, annuler la transaction
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      console.error('Erreur dans updateAffectation:', error);
      throw error;
    }
  },
  // 🔎 Obtenir un calendrier par date
  getCalendrierByDate: async (date) => {
    const query = 'SELECT * FROM calendrier WHERE date = ?';
    const [rows] = await db.execute(query, [date]);
    return rows[0];
  },
  getCurrentAffectation: async (pompiste_id) => {
    console.log(`Recherche affectation pour pompiste ${pompiste_id}`);
    const now = new Date();
    const currentHour = now.getHours();
    
    let poste_id = 1; // Matin par défaut
    if (currentHour >= 14 && currentHour < 22) poste_id = 2;
    else if (currentHour >= 22 || currentHour < 6) poste_id = 3;
  
    let queryDate = formatDate(now);
    if (currentHour < 6) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      queryDate = formatDate(yesterday);
    }
  
    console.log(`Date recherchée: ${queryDate}, Poste ID: ${poste_id}`);
  
    const query = `
      SELECT 
        a.id AS affectation_id,
        a.pompiste_id,
        a.poste_id,
        a.pompe_id,
        a.calendrier_id,
        u.username AS pompiste,
        p.numero_pompe,
        po.nom AS poste,
        c.date,
        po.heure_debut,
        po.heure_fin
      FROM affectations a
      JOIN utilisateurs u ON a.pompiste_id = u.id
      JOIN pompes p ON a.pompe_id = p.id
      JOIN postes po ON a.poste_id = po.id
      JOIN calendrier c ON a.calendrier_id = c.id
      WHERE a.pompiste_id = ? 
      AND c.date = ?
      AND a.poste_id = ?
    `;
  
    console.log('Requête SQL:', query.replace(/\s+/g, ' ').trim());
    console.log('Paramètres:', [pompiste_id, queryDate, poste_id]);
  
    const [rows] = await db.execute(query, [pompiste_id, queryDate, poste_id]);
    console.log('Résultats:', rows);
    
    return rows[0];
  },
// Obtenir les pistolets disponibles pour une affectation
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
// Fonction utilitaire pour formater une date au format YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}

export default AffectationCalendrier;
