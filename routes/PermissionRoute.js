// permission.routes.js
import express from 'express';
import PermissionController from '../controllers/PermissionController.js';

const router = express.Router();

router.get('/permissions', PermissionController.getPermissions);
router.post('/permissions/update', PermissionController.updatePermission);
router.get('/permissions/role/:role', PermissionController.getPermissionsParRole);
router.get('/permissions/dashboard/:role', PermissionController.getDashboardPermission);
router.get('/permissions/roles', PermissionController.getAllRoles);
router.post('/permissions/update-multiple', PermissionController.updateMultiplePermissions);

export default router;