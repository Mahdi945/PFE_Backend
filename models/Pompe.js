import db from '../config/db.js';

const Pompe = {
  // Ajouter une pompe
  addPompe: (numero_pompe, type_pompe, statut) => {
    const query = `
      INSERT INTO pompes (numero_pompe, type_pompe, statut)
      VALUES (?, ?, ?)
    `;
    return db.execute(query, [numero_pompe, type_pompe, statut]);
  },

  // Récupérer toutes les pompes
  getAllPompes: () => {
    const query = 'SELECT * FROM pompes';
    return db.execute(query);
  },

  // Récupérer une pompe par son ID
  getPompeById: (id) => {
    const query = 'SELECT * FROM pompes WHERE id = ?';
    return db.execute(query, [id]);
  },

  // Mettre à jour une pompe
  updatePompe: (id, numero_pompe, type_pompe, statut) => {
    const query = `
      UPDATE pompes
      SET numero_pompe = ?, type_pompe = ?, statut = ?
      WHERE id = ?
    `;
    return db.execute(query, [numero_pompe, type_pompe, statut, id]);
  },

  // Supprimer une pompe
  deletePompe: (id) => {
    const query = 'DELETE FROM pompes WHERE id = ?';
    return db.execute(query, [id]);
  }
};

export default Pompe;
