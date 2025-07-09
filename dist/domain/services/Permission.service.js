"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
class PermissionService {
    constructor(useCase) {
        this.useCase = useCase;
    }
    create(data) {
        return this.useCase.create(data);
    }
    update(id, data) {
        return this.useCase.update(id, data);
    }
    findById(id) {
        return this.useCase.findById(id);
    }
    findAll() {
        return this.useCase.findAll();
    }
    delete(id) {
        return this.useCase.delete(id);
    }
    assignPermissionsToUser(userId, permissionIds, grantedBy) {
        return this.useCase.assignPermissionsToUser(userId, permissionIds, grantedBy);
    }
    revokePermissionsFromUser(userId, permissionIds) {
        return this.useCase.revokePermissionsFromUser(userId, permissionIds);
    }
    batchAssignPermission(permissionId, userIds, grantedBy) {
        return this.useCase.batchAssignPermission(permissionId, userIds, grantedBy);
    }
    getUserPermissions(userId) {
        return this.useCase.getUserPermissions(userId);
    }
    checkUserHasPermission(userId, permissionName) {
        return this.useCase.checkUserHasPermission(userId, permissionName);
    }
    getAllPermissionsForUser(userId) {
        return this.useCase.getAllPermissionsForUser(userId);
    }
    getAllUsersWithPermission(permissionId) {
        return this.useCase.getAllUsersWithPermission(permissionId);
    }
    checkMultiplePermissions(userId, permissionNames) {
        return this.useCase.checkMultiplePermissions(userId, permissionNames);
    }
}
exports.PermissionService = PermissionService;
//# sourceMappingURL=Permission.service.js.map