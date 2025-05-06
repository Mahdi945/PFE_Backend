// permission.model.js
import db from '../config/db.js';

const Permission = {
  // Récupérer toutes les permissions
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM permissions");
    return rows;
  },
  getByRole: async (role) => {
    const normalizedRole = role.toLowerCase();
    const [rows] = await db.query(
      "SELECT * FROM permissions WHERE role = ? AND is_visible = 1", 
      [normalizedRole]
    );
    return rows;
  },
  // Récupérer la permission dashboard spécifique au rôle
  getDashboardPermission: async (role) => {
    const [rows] = await db.query(
      "SELECT * FROM permissions WHERE role = ? AND element_name LIKE 'Dashboard-%'", 
      [role]
    );
    return rows[0];
  },

  // Récupérer tous les rôles distincts
  getAllRoles: async () => {
    const [rows] = await db.query("SELECT DISTINCT role FROM permissions ORDER BY role");
    return rows.map(row => row.role); // Correction de 'roale' à 'role'
  },

  // Récupérer les permissions par rôle et élément parent
  getByRoleAndParent: async (role, parent) => {
    const [rows] = await db.query(
      "SELECT * FROM permissions WHERE role = ? AND parent_element = ? ORDER BY element_name", 
      [role, parent]
    );
    return rows;
  },

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
    const queries = updates.map(update => ({
      sql: 'UPDATE permissions SET is_visible = ? WHERE role = ? AND element_name = ?',
      values: [update.is_visible, update.role, update.element_name]
    }));

    const results = await Promise.all(
      queries.map(q => db.query(q.sql, q.values))
    );

    return results.reduce((total, [result]) => total + result.affectedRows, 0);
  }
};

export default Permission;