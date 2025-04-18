import db from '../config/db.js';

const Pistolet = {
  addPistolet: async (pompe_id, numero_pistolet, index_ouverture = 0, statut = 'disponible') => {
    const [result] = await db.query(
      'INSERT INTO pistolets (pompe_id, numero_pistolet, index_ouverture, index_fermeture, statut) VALUES (?, ?, ?, 0, ?)',
      [pompe_id, numero_pistolet, index_ouverture, statut]
    );
    return result.insertId;
  },

  // Ajoutez cette méthode pour mettre à jour le statut
updateStatutPistolet: async (id, statut) => {
  const [result] = await db.query(
    'UPDATE pistolets SET statut = ? WHERE id = ?',
    [statut, id]
  );
  return result.affectedRows;
},

  // Mettre à jour l'index de fermeture pour un pistolet spécifique
  updateIndexFermeture: async (id, index_fermeture) => {
    const [result] = await db.query(
      'UPDATE pistolets SET index_fermeture = ? WHERE id = ?',
      [index_fermeture, id]
    );
    return result.affectedRows;
  },

  // Récupérer un pistolet spécifique
  getPistoletById: async (id) => {
    const [rows] = await db.query('SELECT * FROM pistolets WHERE id = ?', [id]);
    return rows[0];
  },

  // Mettre à jour l'index d'ouverture pour un pistolet spécifique
  updateIndexOuverture: async (id, index_ouverture) => {
    const [result] = await db.query(
      'UPDATE pistolets SET index_ouverture = ? WHERE id = ?',
      [index_ouverture, id]
    );
    return result.affectedRows;
  },

  // Obtenir tous les pistolets d'une pompe
  getPistoletsByPompeId: async (pompe_id) => {
    const [rows] = await db.query('SELECT * FROM pistolets WHERE pompe_id = ?', [pompe_id]);
    return rows;
  },

  // Obtenir tous les pistolets
  getAllPistolets: async () => {
    const [rows] = await db.query('SELECT * FROM pistolets');
    return rows;
  }
};

export default Pistolet;