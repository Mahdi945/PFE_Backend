import Notification from '../models/Notification.js';

const getNotifications = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [notifications] = await Notification.getByUser(id_utilisateur);
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.body;
    await Notification.markAsRead(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getUnreadCount = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [result] = await Notification.countUnread(id_utilisateur);
    res.json({ success: true, count: result[0].count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const markAllAsRead = async (req, res) => {
  try {
    const { id_utilisateur } = req.body;
    await Notification.markAllAsRead(id_utilisateur);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default {
  getNotifications,
  markAsRead,
  getUnreadCount,
  markAllAsRead
};