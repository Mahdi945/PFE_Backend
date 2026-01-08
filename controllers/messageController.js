import Message from '../models/Message.js';
import db from '../config/db.js';

export default {
  /**
   * Envoie un nouveau message entre utilisateurs
   * Gère l'envoi via HTTP et WebSocket pour la notification en temps réel
   */
  sendMessage: async (req, res) => {
    try {
      const { senderId, receiverId, content } = req.body;
      const messageId = await Message.create(senderId, receiverId, content);

      // Get full message data with user info
      const [messageData] = await db.execute(
        `
        SELECT m.*, u1.username as sender_name, u1.photo as sender_photo, 
               u2.username as receiver_name, u2.photo as receiver_photo
        FROM messages m
        JOIN utilisateurs u1 ON m.sender_id = u1.id
        JOIN utilisateurs u2 ON m.receiver_id = u2.id
        WHERE m.id = ?
      `,
        [messageId]
      );

      const fullMessage = messageData[0];

      // Get io instance from app
      const io = req.app.get('io');

      if (io) {
        // Envoyer le message au destinataire s'il est connecté
        io.emit('newMessage', fullMessage);

        // Mettre à jour le compteur de messages non lus pour le destinataire
        const unreadCount = await Message.getUnreadCount(receiverId);
        io.emit('unreadCountUpdate', {
          userId: receiverId,
          count: unreadCount,
        });

        console.log(`📨 Message sent via HTTP and WebSocket: ${senderId} -> ${receiverId}`);
      }

      res.status(201).json({
        success: true,
        id: messageId,
        message: fullMessage,
      });
    } catch (error) {
      console.error('Error sending message via HTTP:', error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Récupère la conversation entre deux utilisateurs
   * Retourne l'historique des messages échangés
   */
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

  /**
   * Récupère tous les messages d'un utilisateur
   * Permet d'afficher l'historique complet des messages reçus et envoyés
   */
  getUserMessages: async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await Message.getUserMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Récupère le nombre de messages non lus pour un utilisateur
   * Utile pour afficher les notifications de nouveaux messages
   */
  getUnreadCount: async (req, res) => {
    try {
      const { userId } = req.params;
      const count = await Message.getUnreadCount(userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Marque les messages comme lus entre deux utilisateurs
   * Met à jour le statut des messages dans la base de données
   */
  markAsRead: async (req, res) => {
    try {
      const { senderId, receiverId } = req.body;
      await Message.markAsRead(senderId, receiverId);

      // Get io instance and emit unread count update
      const io = req.app.get('io');
      if (io) {
        const unreadCount = await Message.getUnreadCount(receiverId);
        io.emit('unreadCountUpdate', {
          userId: receiverId,
          count: unreadCount,
        });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Récupère tous les contacts d'un utilisateur avec qui il a conversé
   * Inclut les informations sur le dernier message et le statut de l'utilisateur
   */
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
      const contacts = users
        .map(user => {
          const conversation = conversations.find(c => c.contact_id == user.id);
          return {
            ...user,
            status: 'active', // On force le statut à "active" ici aussi
            lastMessageTime: conversation?.last_message_time || null,
            unreadCount: conversation?.unread_count || 0,
          };
        })
        .sort((a, b) => {
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
  },
};
