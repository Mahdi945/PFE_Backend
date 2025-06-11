import Notification from '../models/Notification.js';

/**
 * Récupère toutes les notifications d'un utilisateur spécifique
 * Retourne la liste des notifications ordonnées par date
 */
const getNotifications = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [notifications] = await Notification.getByUser(id_utilisateur);
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Marque une notification spécifique comme lue
 * Met à jour le statut de lecture d'une notification
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.body;
    await Notification.markAsRead(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Récupère le nombre de notifications non lues d'un utilisateur
 * Utilisé pour afficher le badge de compteur dans l'interface
 */
const getUnreadCount = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [result] = await Notification.countUnread(id_utilisateur);
    res.json({ success: true, count: result[0].count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Marque toutes les notifications d'un utilisateur comme lues
 * Opération en lot pour effacer tous les badges de notification
 */
const markAllAsRead = async (req, res) => {
  try {
    const { id_utilisateur } = req.body;
    await Notification.markAllAsRead(id_utilisateur);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Cache une notification spécifique sans la supprimer définitivement
 * Permet à l'utilisateur de nettoyer sa liste de notifications
 */
const hideNotification = async (req, res) => {
  try {
    const { id, id_utilisateur } = req.body;
    await Notification.delete(id, id_utilisateur);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Cache toutes les notifications d'un utilisateur
 * Nettoie complètement la liste des notifications pour un utilisateur
 */
const hideAllNotifications = async (req, res) => {
  try {
    const { id_utilisateur } = req.body;
    await Notification.deleteAll(id_utilisateur);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default {
  getNotifications,
  markAsRead,
  getUnreadCount,
  markAllAsRead,
  hideAllNotifications,
  hideNotification,
};
