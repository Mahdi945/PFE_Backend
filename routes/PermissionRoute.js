import express from 'express';
import passport from 'passport';
import PermissionController from '../controllers/PermissionController.js';

const router = express.Router();

// Middleware d'authentification JWT
const requireAuth = passport.authenticate('jwt', { session: false });

// ==================== ROUTES PROTÉGÉES ====================

router.get('/permissions', requireAuth, PermissionController.getPermissions);
router.post('/permissions/update', requireAuth, PermissionController.updatePermission);
router.get('/permissions/role/:role', requireAuth, PermissionController.getPermissionsParRole);
router.get(
  '/permissions/dashboard/:role',
  requireAuth,
  PermissionController.getDashboardPermission,
);
router.get('/permissions/roles', requireAuth, PermissionController.getAllRoles);
router.post(
  '/permissions/update-multiple',
  requireAuth,
  PermissionController.updateMultiplePermissions,
);

export default router;
