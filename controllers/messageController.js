import Message from '../models/Message.js';
import db from '../config/db.js';

export default {
  sendMessage: async (req, res) => {
    try {
      const { senderId, receiverId, content } = req.body;
      const messageId = await Message.create(senderId, receiverId, content);
      res.status(201).json({ id: messageId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getConversation: async (req, res) => {
    try {
      const { user1, user2 } = req.params;
      const messages = await Message.getConversation(user1, user2);
      await Message.markAsRead(user2, user1); // Marquer comme lu quand on récupère la conversation
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserMessages: async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await Message.getUserMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUnreadCount: async (req, res) => {
    try {
      const { userId } = req.params;
      const count = await Message.getUnreadCount(userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  markAsRead: async (req, res) => {
    try {
      const { senderId, receiverId } = req.body;
      await Message.markAsRead(senderId, receiverId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllContacts: async (req, res) => {
    try {
      const { userId } = req.params;
      
      // 1. Récupérer tous les utilisateurs sauf l'utilisateur courant, 
      // avec rôle différent de "client" et statut "active"
      const [users] = await db.execute(
        'SELECT id, username, email, role, photo FROM utilisateurs WHERE id != ? AND role != ? AND status = ?',
        [userId, 'client', 'active']
      );
      
      // 2. Récupérer les conversations existantes
      const [conversations] = await db.execute(
        `SELECT 
          CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END as contact_id,
          MAX(created_at) as last_message_time,
          SUM(CASE WHEN is_read = 0 AND receiver_id = ? THEN 1 ELSE 0 END) as unread_count
         FROM messages
         WHERE sender_id = ? OR receiver_id = ?
         GROUP BY contact_id`,
        [userId, userId, userId, userId]
      );
      
      // 3. Fusionner les données et trier
      const contacts = users.map(user => {
        const conversation = conversations.find(c => c.contact_id == user.id);
        return {
          ...user,
          status: 'active', // On force le statut à "active" ici aussi
          lastMessageTime: conversation?.last_message_time || null,
          unreadCount: conversation?.unread_count || 0
        };
      }).sort((a, b) => {
        // Trier par nombre de messages non lus, puis par date de dernier message
        if (a.unreadCount > b.unreadCount) return -1;
        if (a.unreadCount < b.unreadCount) return 1;
        if (a.lastMessageTime && b.lastMessageTime) {
          return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
        }
        return 0;
      });
      
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};