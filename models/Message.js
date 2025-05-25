import db from '../config/db.js';

class Message {
  static async create(senderId, receiverId, content) {
    const [result] = await db.execute(
      'INSERT INTO messages (sender_id, receiver_id, content, is_read) VALUES (?, ?, ?, 0)',
      [senderId, receiverId, content]
    );
    return result.insertId;
  }

  static async getConversation(user1, user2) {
    const [messages] = await db.execute(
      `SELECT m.*, u1.username as sender_name, u1.photo as sender_photo, 
       u2.username as receiver_name, u2.photo as receiver_photo
       FROM messages m
       JOIN utilisateurs u1 ON m.sender_id = u1.id
       JOIN utilisateurs u2 ON m.receiver_id = u2.id
       WHERE (m.sender_id = ? AND m.receiver_id = ?) 
       OR (m.sender_id = ? AND m.receiver_id = ?)
       ORDER BY m.created_at ASC`,
      [user1, user2, user2, user1]
    );
    return messages;
  }

  static async getUserMessages(userId) {
    const [messages] = await db.execute(
      `SELECT DISTINCT 
       CASE WHEN m.sender_id = ? THEN m.receiver_id ELSE m.sender_id END as contact_id,
       u.username as contact_name, u.photo as contact_photo,
       MAX(m.created_at) as last_message_time,
       SUM(CASE WHEN m.is_read = 0 AND m.receiver_id = ? THEN 1 ELSE 0 END) as unread_count
       FROM messages m
       JOIN utilisateurs u ON (m.sender_id = u.id OR m.receiver_id = u.id) AND u.id != ?
       WHERE m.sender_id = ? OR m.receiver_id = ?
       GROUP BY contact_id, contact_name, contact_photo
       ORDER BY last_message_time DESC`,
      [userId, userId, userId, userId, userId]
    );
    return messages;
  }

  static async markAsRead(senderId, receiverId) {
    await db.execute(
      'UPDATE messages SET is_read = 1 WHERE sender_id = ? AND receiver_id = ? AND is_read = 0',
      [senderId, receiverId]
    );
  }

  static async getUnreadCount(userId) {
    const [result] = await db.execute(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0',
      [userId]
    );
    return result[0].count;
  }
}

export default Message;