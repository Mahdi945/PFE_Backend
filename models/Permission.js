import db from '../config/db.js';

const Permission = {
  // Récupérer toutes les permissions sauf Dashboard
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM permissions WHERE element_name != 'Dashboard'");
    return rows;
  },

  // Récupérer les permissions par rôle (tous les éléments sauf Dashboard)
  getByRole: async (role) => {
    const [rows] = await db.query(
      "SELECT * FROM permissions WHERE role = ? AND element_name != 'Dashboard' ORDER BY element_name", 
      [role]
    );
    return rows;
  },

  // Récupérer tous les rôles distincts
  getAllRoles: async () => {
    const [rows] = await db.query("SELECT DISTINCT role FROM permissions ORDER BY role");
    return rows.map(row => row.role);
  },

  // Récupérer les permissions par rôle et élément parent (sauf Dashboard)
  getByRoleAndParent: async (role, parent) => {
    const [rows] = await db.query(
      "SELECT * FROM permissions WHERE role = ? AND parent_element = ? AND element_name != 'Dashboard' ORDER BY element_name", 
      [role, parent]
    )},

  // Mettre à jour une permission
  update: async (role, element_name, is_visible) => {
    const [result] = await db.query(
      'UPDATE permissions SET is_visible = ? WHERE role = ? AND element_name = ?',
      [is_visible, role, element_name]
    );
    return result.affectedRows;
  },

  // Mettre à jour plusieurs permissions en une seule requête
  updateMultiple: async (updates) => {
    // Préparer les requêtes batch
    const queries = updates.map(update => ({
      sql: 'UPDATE permissions SET is_visible = ? WHERE role = ? AND element_name = ?',
      values: [update.is_visible, update.role, update.element_name]
    }));

    // Exécuter toutes les requêtes
    const results = await Promise.all(
      queries.map(q => db.query(q.sql, q.values))
    );

    // Retourner le nombre total de lignes affectées
    return results.reduce((total, [result]) => total + result.affectedRows, 0);
  }
};

export default Permission;