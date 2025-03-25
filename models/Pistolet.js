import db from '../config/db.js';

const Pistolet = {
  // Ajouter un pistolet à la base de données
  addPistolet: async (pompe_id, numero_pistolet) => {
    const [result] = await db.query(
      'INSERT INTO pistolets (pompe_id, numero_pistolet) VALUES (?, ?)',
      [pompe_id, numero_pistolet]
    );
    return result.insertId;
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
  }
};

export default Pistolet;
