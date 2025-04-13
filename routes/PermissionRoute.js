import express from 'express';
import PermissionController from '../controllers/PermissionController.js';

const router = express.Router();

router.get('/permissions', PermissionController.getPermissions);
router.post('/permissions/update', PermissionController.updatePermission);
router.get('/permissions/role/:role', PermissionController.getPermissionsParRole);


export default router;
