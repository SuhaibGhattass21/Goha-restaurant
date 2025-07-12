"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoutes = void 0;
const express_1 = require("express");
const permission_validator_1 = require("../validators/permission.validator");
class PermissionRoutes {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', permission_validator_1.PermissionValidator.create(), this.controller.create.bind(this.controller));
        this.router.get('/', this.controller.getAll.bind(this.controller));
        this.router.get('/:id', permission_validator_1.PermissionValidator.getById(), this.controller.getById.bind(this.controller));
        this.router.put('/:id', permission_validator_1.PermissionValidator.update(), this.controller.update.bind(this.controller));
        this.router.delete('/:id', permission_validator_1.PermissionValidator.getById(), this.controller.delete.bind(this.controller));
        this.router.post('/assign', permission_validator_1.PermissionValidator.assignPermissions(), this.controller.assignPermissionsToUser.bind(this.controller));
        this.router.post('/revoke', permission_validator_1.PermissionValidator.revokePermissions(), this.controller.revokePermissionsFromUser.bind(this.controller));
        this.router.post('/batch-assign', permission_validator_1.PermissionValidator.batchAssignPermission(), this.controller.batchAssignPermission.bind(this.controller));
        // User permission queries
        this.router.get('/user/:userId/permissions', this.controller.getUserPermissions.bind(this.controller));
        this.router.get('/user/:userId/has-permission/:permissionName', this.controller.checkUserHasPermission.bind(this.controller));
        this.router.post('/user/:userId/check-permissions', permission_validator_1.PermissionValidator.checkMultiplePermissions(), this.controller.checkMultiplePermissions.bind(this.controller));
        this.router.get('/user/:userId/all-permissions', this.controller.getAllPermissionsForUser.bind(this.controller));
        this.router.get('/users-with-permission/:permissionId', this.controller.getAllUsersWithPermission.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.PermissionRoutes = PermissionRoutes;
//# sourceMappingURL=permission.routes.js.map