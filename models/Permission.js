import db from '../config/db.js';

const Permission = {
  getAll: (callback) => {
    db.query('SELECT * FROM permissions', callback);
  },

  getByRole: (role, callback) => {
    db.query('SELECT * FROM permissions WHERE role = ?', [role], callback);
  },

  update: (role, element_name, is_visible, callback) => {
    db.query(
      'UPDATE permissions SET is_visible = ? WHERE role = ? AND element_name = ?',
      [is_visible, role, element_name],
      callback
    );
  }
};

export default Permission;
