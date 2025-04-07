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

  addAffectationAutomatiqueEquitable: async (mois, annee) => {
    try {
      const [existingAffectations] = await db.execute(
        `SELECT * FROM affectations a
         JOIN calendrier c ON a.calendrier_id = c.id
         WHERE c.mois = ? AND c.annee = ?`,
        [mois, annee]
      );

      if (existingAffectations.length > 0) {
        throw new Error('Les affectations automatiques pour ce mois existent déjà.');
      }

      const [pompistes] = await db.execute('SELECT id FROM utilisateurs WHERE role = "pompiste"');
      const [postes] = await db.execute('SELECT * FROM postes');
      const [pompes] = await db.execute('SELECT * FROM pompes');

      // Générer le calendrier s’il n’existe pas
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

      const [calendriers] = await db.execute(
        'SELECT * FROM calendrier WHERE mois = ? AND annee = ?',
        [mois, annee]
      );

      const shifts = postes.map(p => ({ id: p.id, nom: p.nom }));
      const nbPompes = pompes.length;

      for (const jour of calendriers) {
        const shuffledPompistes = [...pompistes].sort(() => 0.5 - Math.random());
        let pompistePointer = 0;

        for (const shift of shifts) {
          const pompisteAssignments = {};

          for (let i = 0; i < nbPompes; i++) {
            const pompe = pompes[i];
            let assigned = false;

            let tryCount = 0;
            while (!assigned && tryCount < shuffledPompistes.length) {
              const pompiste = shuffledPompistes[pompistePointer % shuffledPompistes.length];

              if (!pompisteAssignments[pompiste.id]) {
                pompisteAssignments[pompiste.id] = [];
              }

              if (pompisteAssignments[pompiste.id].length < 2) {
                await db.execute(
                  `INSERT INTO affectations (pompiste_id, poste_id, pompe_id, calendrier_id)
                   VALUES (?, ?, ?, ?)`,
                  [pompiste.id, shift.id, pompe.id, jour.id]
                );
                pompisteAssignments[pompiste.id].push(pompe.id);
                assigned = true;
              }

              pompistePointer++;
              tryCount++;
            }
          }
        }
      }
    } catch (error) {
      console.error('Erreur dans addAffectationAutomatiqueEquitable:', error);
      throw error;
    }
  }
,

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
