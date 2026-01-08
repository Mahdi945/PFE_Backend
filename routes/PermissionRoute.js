import express from 'express';
import passport from 'passport';
import PermissionController from '../controllers/PermissionController.js';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES PROTÉGÉES ====================

// Récupère toutes les permissions disponibles dans le système pour configuration générale
router.get('/permissions', requireAuth, PermissionController.getPermissions);

// Met à jour une permission spécifique pour modifier l'accès d'un rôle à un élément
router.post('/permissions/update', requireAuth, PermissionController.updatePermission);

// Récupère toutes les permissions d'un rôle spécifique pour configurer les accès utilisateur
router.get('/permissions/role/:role', requireAuth, PermissionController.getPermissionsParRole);

// Récupère les permissions spécifiques au dashboard selon le rôle pour personnaliser l'interface
router.get(
  '/permissions/dashboard/:role',
  requireAuth,
  PermissionController.getDashboardPermission
);

// Récupère la liste de tous les rôles existants pour la gestion des utilisateurs
router.get('/permissions/roles', requireAuth, PermissionController.getAllRoles);

// Met à jour plusieurs permissions en une seule opération pour optimiser les modifications en masse
router.post(
  '/permissions/update-multiple',
  requireAuth,
  PermissionController.updateMultiplePermissions
);

export default router;
