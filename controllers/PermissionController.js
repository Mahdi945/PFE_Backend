import Permission from '../models/Permission.js';

/**
 * Récupère toutes les permissions disponibles dans le système
 * Retourne la liste complète des permissions configurées
 */
const getPermissions = async (req, res) => {
  try {
    const results = await Permission.getAll();
    res.json(results || []);
  } catch (err) {
    console.error('Error in getPermissions:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des permissions' });
  }
};

/**
 * Récupère les permissions spécifiques à un rôle donné
 * Filtre les permissions selon le rôle utilisateur (gérant, caissier, etc.)
 */
const getPermissionsParRole = async (req, res) => {
  try {
    const { role } = req.params;

    if (!role) {
      return res.status(400).json({ error: 'Le rôle est requis.' });
    }

    const results = await Permission.getByRole(role);
    res.json(results);
  } catch (err) {
    console.error('Error in getPermissionsParRole:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des permissions' });
  }
};

/**
 * Récupère les permissions d'accès au tableau de bord pour un rôle
 * Détermine quelles sections du dashboard sont accessibles
 */
const getDashboardPermission = async (req, res) => {
  try {
    const { role } = req.params;
    const result = await Permission.getDashboardPermission(role);
    res.json(result || {});
  } catch (err) {
    console.error('Error in getDashboardPermission:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la permission dashboard' });
  }
};

/**
 * Récupère tous les rôles disponibles dans le système
 * Retourne la liste complète des rôles configurés
 */
const getAllRoles = async (req, res) => {
  try {
    const results = await Permission.getAllRoles();
    res.json(results);
  } catch (err) {
    console.error('Error in getAllRoles:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
  }
};

/**
 * Met à jour une permission spécifique
 * Modifie les paramètres d'une permission selon les besoins
 */
const updatePermission = async (req, res) => {
  try {
    const { role, element_name, is_visible } = req.body;

    if (!role || !element_name || is_visible === undefined) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const affectedRows = await Permission.update(role, element_name, is_visible);
    res.json({
      message: 'Permission mise à jour avec succès',
      affectedRows,
    });
  } catch (err) {
    console.error('Error in updatePermission:', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

/**
 * Met à jour plusieurs permissions en même temps
 * Permet de modifier en masse les paramètres des permissions
 */
const updateMultiplePermissions = async (req, res) => {
  try {
    const { updates } = req.body;

    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ error: 'Données de mise à jour invalides.' });
    }

    const affectedRows = await Permission.updateMultiple(updates);
    res.json({
      message: `${affectedRows} permission(s) mise(s) à jour avec succès`,
      affectedRows,
    });
  } catch (err) {
    console.error('Error in updateMultiplePermissions:', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des permissions' });
  }
};

export default {
  getPermissions,
  updatePermission,
  getPermissionsParRole,
  getDashboardPermission,
  getAllRoles,
  updateMultiplePermissions,
};
