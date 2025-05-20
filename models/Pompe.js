import db from '../config/db.js';

const Pompe = {
  // Ajouter une pompe
  addPompe: (numero_pompe, type_pompe, statut) => {
    const query = `
      INSERT INTO pompes (numero_pompe, type_pompe, statut, created_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
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

  // Récupérer une pompe par un critère (comme numero_pompe)
  findOne: (criteria) => {
    let query = 'SELECT * FROM pompes WHERE ';
    const keys = Object.keys(criteria);
    const values = [];

    keys.forEach((key, index) => {
      query += `${key} = ?`;
      if (index < keys.length - 1) query += ' AND ';
      values.push(criteria[key]);
    });

    return db.execute(query, values);
  },
  findByNumero: async (numero_pompe) => {
    const [rows] = await db.query('SELECT * FROM pompes WHERE numero_pompe = ?', [numero_pompe]);
    return rows[0];
  },
  updatePompe: (id, fieldsToUpdate) => {
    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      return Promise.reject(new Error('Aucun champ à mettre à jour'));
    }

    let query = 'UPDATE pompes SET ';
    const values = [];

    keys.forEach((key, index) => {
      query += `${key} = ?`;
      if (index < keys.length - 1) query += ', ';
      values.push(fieldsToUpdate[key]);
    });

    // Clause WHERE
    query += ' WHERE id = ?';
    values.push(id);

    return db.execute(query, values);
  },

  // Supprimer une pompe
  deletePompe: (id) => {
    const query = 'DELETE FROM pompes WHERE id = ?';
    return db.execute(query, [id]);
  },
  // Récupérer les pompes avec filtre (par numéro, statut, type)
  getPompesByFilters: (numero_pompe, statut, type_pompe) => {
    let query = 'SELECT * FROM pompes WHERE 1=1';
    const values = [];

    if (numero_pompe) {
      query += ' AND numero_pompe LIKE ?';
      values.push(`%${numero_pompe}%`);
    }
    if (statut) {
      query += ' AND statut = ?';
      values.push(statut);
    }
    if (type_pompe) {
      query += ' AND type_pompe = ?';
      values.push(type_pompe);
    }

    return db.execute(query, values);
  },
  getPompeStats: async () => {
    const query = `
    SELECT 
      p.id,
      p.numero_pompe,
      p.type_pompe,
      p.statut,
      COUNT(pt.id) AS nombre_pistolets,
      SUM(CASE WHEN pt.statut = 'disponible' THEN 1 ELSE 0 END) AS pistolets_disponibles,
      SUM(CASE WHEN pt.statut = 'indisponible' THEN 1 ELSE 0 END) AS pistolets_indisponibles,
      SUM(CASE WHEN pt.statut = 'maintenance' THEN 1 ELSE 0 END) AS pistolets_maintenance,
      GROUP_CONCAT(pt.numero_pistolet ORDER BY pt.numero_pistolet SEPARATOR ', ') AS numeros_pistolets
    FROM pompes p
    LEFT JOIN pistolets pt ON p.id = pt.pompe_id
    GROUP BY p.id
  `;
    return db.execute(query);
  },
};

export default Pompe;
