import db from '../config/db.js'; // Votre configuration de la base de données

const AffectationCalendrier = {
  // Ajouter une affectation manuelle
  addAffectationManuelle: async (pompiste_id, poste_id, pompe_id, calendrier_id) => {
    const query = `
      INSERT INTO affectations (pompiste_id, poste_id, pompe_id, calendrier_id, statut)
      VALUES (?, ?, ?, ?, 'occupé')
    `;
    return db.execute(query, [pompiste_id, poste_id, pompe_id, calendrier_id]);
  },

  // Ajouter une affectation automatique équitable
  addAffectationAutomatiqueEquitable: async (mois, annee, pompistes, postes, pompes) => {
    // Récupérer les jours du mois et de l'année spécifiés
    const queryCalendrier = `
      SELECT * FROM calendrier WHERE MONTH(date) = ? AND YEAR(date) = ?
    `;
    const [calendriers] = await db.execute(queryCalendrier, [mois, annee]);

    // Initialisation de l'index pour chaque pompiste
    let pompistesIndex = new Array(pompistes.length).fill(0);

    // Répartir les affectations équitablement sur les jours disponibles
    const affectationsPromises = calendriers.map(async (calendrier) => {
      // Trouver l'indice du pompiste pour cet affectation (en fonction de l'index pour la répartition équitable)
      let pompisteIndex = 0;
      for (let i = 0; i < pompistes.length; i++) {
        if (pompistesIndex[i] < pompistesIndex[pompisteIndex]) {
          pompisteIndex = i;
        }
      }

      // Sélectionner un pompiste, un poste (matin, après-midi, nuit) et une pompe pour ce jour
      const pompiste = pompistes[pompisteIndex];
      const poste = postes[Math.floor(Math.random() * postes.length)];
      const pompe = pompes[Math.floor(Math.random() * pompes.length)];

      // Incrémenter l'index du pompiste
      pompistesIndex[pompisteIndex]++;

      // Enregistrer l'affectation dans la base de données
      return db.execute(
        `INSERT INTO affectations (pompiste_id, poste_id, pompe_id, calendrier_id, statut)
        VALUES (?, ?, ?, ?, 'occupé')`,
        [pompiste.id, poste.id, pompe.id, calendrier.id]
      );
    });

    // Exécuter toutes les affectations
    await Promise.all(affectationsPromises);
  },

  // Récupérer les affectations d'un jour spécifique
  getAffectationsByJour: async (calendrier_id) => {
    const query = 'SELECT * FROM affectations WHERE calendrier_id = ?';
    const [affectations] = await db.execute(query, [calendrier_id]);
    return affectations;
  },

  // Récupérer les affectations d'un mois et année
  getAffectationsByMonthYear: async (mois, annee) => {
    const query = `
      SELECT * FROM affectations
      JOIN calendrier ON affectations.calendrier_id = calendrier.id
      WHERE MONTH(calendrier.date) = ? AND YEAR(calendrier.date) = ?
    `;
    const [affectations] = await db.execute(query, [mois, annee]);
    return affectations;
  }
};

export default AffectationCalendrier;
