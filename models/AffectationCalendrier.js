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
        // Pour chaque poste (matin, après-midi, nuit)
        for (const poste of postes) {
          // Mélanger les pompistes pour une distribution aléatoire
          const shuffledPompistes = [...pompistes].sort(() => 0.5 - Math.random());
          
          // Affecter chaque pompe à un pompiste différent
          for (const pompe of pompes) {
            let affectationValide = false;
            let tentative = 0;
            
            // Essayer d'affecter un pompiste qui n'est pas déjà sur ce poste ce jour-là
            while (!affectationValide && tentative < shuffledPompistes.length) {
              const pompiste = shuffledPompistes[tentative];
              
              // Vérifier si le pompiste est déjà sur ce poste ce jour-là
              const dejaAffecte = await AffectationCalendrier.checkPompisteAffectation(
                pompiste.id, 
                jour.id, 
                poste.id
              );
              
              if (!dejaAffecte) {
                // Vérifier si la pompe est déjà occupée pour ce poste ce jour-là
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
        a.calendrier_id
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
    const fields = [];
    const values = [];
  
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
  
    // Construire dynamiquement les champs à mettre à jour
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
  
    // Ajouter l'ID à la fin des valeurs
    values.push(id);
  
    // Construire la requête SQL
    const query = `
      UPDATE affectations
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
  
    console.log('Requête SQL générée :', query);
    console.log('Valeurs :', values);
  
    // Exécuter la requête
    return db.execute(query, values);
  },

  // 🔎 Obtenir un calendrier par date
  getCalendrierByDate: async (date) => {
    const query = 'SELECT * FROM calendrier WHERE date = ?';
    const [rows] = await db.execute(query, [date]);
    return rows[0];
  }
};

export default AffectationCalendrier;
