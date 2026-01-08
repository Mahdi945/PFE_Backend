import db from '../config/db.js';

const Notification = {
  // Créer une notification
  create: async (id_utilisateur, entity_type, entity_id, type, message) => {
    const query = `
      INSERT INTO notifications 
      (id_utilisateur, entity_type, entity_id, type, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    return db.execute(query, [id_utilisateur, entity_type, entity_id, type, message]);
  },

  // Récupérer les notifications d'un utilisateur
  getByUser: async (id_utilisateur, limit = null) => {
    let query = `
      SELECT * FROM notifications 
      WHERE id_utilisateur = ?
      ORDER BY created_at DESC
    `;

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    return db.execute(query, [id_utilisateur]);
  },

  // Marquer une notification comme lue
  markAsRead: async id => {
    const query = `
      UPDATE notifications 
      SET vue = 1 
      WHERE id = ?
    `;
    return db.execute(query, [id]);
  },

  // Compter les notifications non lues
  countUnread: async id_utilisateur => {
    const query = `
      SELECT COUNT(*) AS count 
      FROM notifications 
      WHERE id_utilisateur = ? AND vue = 0
    `;
    return db.execute(query, [id_utilisateur]);
  },

  // Marquer toutes les notifications comme lues
  markAllAsRead: async id_utilisateur => {
    const query = `
      UPDATE notifications 
      SET vue = 1
      WHERE id_utilisateur = ? AND vue = 0
    `;
    return db.execute(query, [id_utilisateur]);
  },
  // Supprimer une notification
  delete: async (id, id_utilisateur) => {
    const query = `
      DELETE FROM notifications 
      WHERE id = ? AND id_utilisateur = ?
    `;
    return db.execute(query, [id, id_utilisateur]);
  },

  // Supprimer toutes les notifications d'un utilisateur
  deleteAll: async id_utilisateur => {
    const query = `
      DELETE FROM notifications 
      WHERE id_utilisateur = ?
    `;
    return db.execute(query, [id_utilisateur]);
  },
};

export default Notification;
