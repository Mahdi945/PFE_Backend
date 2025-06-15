import db from '../config/db.js';

const Permission = {
  // Récupère toutes les permissions du système pour vue d'ensemble administrative
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM permissions');
    return rows;
  },

  // Récupère les permissions spécifiques à un rôle pour personnaliser l'accès utilisateur
  getByRole: async role => {
    const normalizedRole = role.toLowerCase();
    const [rows] = await db.query('SELECT * FROM permissions WHERE role = ?', [normalizedRole]);
    return rows;
  },

  // Récupère la permission dashboard spécifique au rôle pour configurer l'interface principale
  getDashboardPermission: async role => {
    const [rows] = await db.query(
      "SELECT * FROM permissions WHERE role = ? AND element_name LIKE 'Dashboard-%'",
      [role]
    );
    return rows[0];
  },

  // Récupère tous les rôles distincts disponibles pour la gestion des utilisateurs
  getAllRoles: async () => {
    const [rows] = await db.query('SELECT DISTINCT role FROM permissions ORDER BY role');
    return rows.map(row => row.role);
  },

  // Récupère les permissions par rôle et élément parent pour organiser hiérarchiquement les accès
  getByRoleAndParent: async (role, parent) => {
    const [rows] = await db.query(
      'SELECT * FROM permissions WHERE role = ? AND parent_element = ? ORDER BY element_name',
      [role, parent]
    );
    return rows;
  },

  // Met à jour une permission individuelle pour modifier l'accès à un élément spécifique
  update: async (role, element_name, is_visible) => {
    const [result] = await db.query(
      'UPDATE permissions SET is_visible = ? WHERE role = ? AND element_name = ?',
      [is_visible, role, element_name]
    );
    return result.affectedRows;
  },

  // Met à jour plusieurs permissions en une seule transaction pour optimiser les modifications en masse
  updateMultiple: async updates => {
    const queries = updates.map(update => ({
      sql: 'UPDATE permissions SET is_visible = ? WHERE role = ? AND element_name = ?',
      values: [update.is_visible, update.role, update.element_name],
    }));

    const results = await Promise.all(queries.map(q => db.query(q.sql, q.values)));

    return results.reduce((total, [result]) => total + result.affectedRows, 0);
  },
};

export default Permission;
