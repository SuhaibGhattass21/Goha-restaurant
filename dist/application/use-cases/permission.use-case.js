"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionUseCases = void 0;
class PermissionUseCases {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(data) {
        const existing = await this.permissionRepository.findByName(data.name);
        if (existing)
            throw new Error('Permission already exists');
        const permission = await this.permissionRepository.create(data);
        return this.mapToDto(permission);
    }
    async update(id, data) {
        const updated = await this.permissionRepository.update(id, data);
        return updated ? this.mapToDto(updated) : null;
    }
    async findById(id) {
        const permission = await this.permissionRepository.findById(id);
        return permission ? this.mapToDto(permission) : null;
    }
    async findAll() {
        const permissions = await this.permissionRepository.findAll();
        return permissions.map(p => this.mapToDto(p));
    }
    async delete(id) {
        return this.permissionRepository.delete(id);
    }
    async assignPermissionsToUser(userId, permissionIds, grantedBy) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        if (!permissionIds || permissionIds.length === 0) {
            throw new Error('At least one permission ID is required');
        }
        if (!grantedBy) {
            throw new Error('Granted by user ID is required');
        }
        for (const permissionId of permissionIds) {
            const permission = await this.permissionRepository.findById(permissionId);
            if (!permission) {
                throw new Error(`Permission with id ${permissionId} not found`);
            }
        }
        return this.permissionRepository.assignPermissionsToUser(userId, permissionIds, grantedBy);
    }
    async revokePermissionsFromUser(userId, permissionIds) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        if (!permissionIds || permissionIds.length === 0) {
            throw new Error('At least one permission ID is required');
        }
        for (const permissionId of permissionIds) {
            const permission = await this.permissionRepository.findById(permissionId);
            if (!permission) {
                throw new Error(`Permission with id ${permissionId} not found`);
            }
        }
        return this.permissionRepository.revokePermissionsFromUser(userId, permissionIds);
    }
    async getUserPermissions(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return this.permissionRepository.getUserPermissions(userId);
    }
    async checkUserHasPermission(userId, permissionName) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        if (!permissionName) {
            throw new Error('Permission name is required');
        }
        const permission = await this.permissionRepository.findByName(permissionName);
        if (!permission) {
            return false;
        }
        return this.permissionRepository.isPermissionAssignedToUser(userId, permission.id);
    }
    async getAllPermissionsForUser(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return this.permissionRepository.getAllPermissionsForUser(userId);
    }
    async getAllUsersWithPermission(permissionId) {
        if (!permissionId) {
            throw new Error('Permission ID is required');
        }
        const permission = await this.permissionRepository.findById(permissionId);
        if (!permission) {
            throw new Error(`Permission with id ${permissionId} not found`);
        }
        return this.permissionRepository.getAllUsersWithPermission(permissionId);
    }
    async checkMultiplePermissions(userId, permissionNames) {
        const userPermissions = await this.permissionRepository.getUserPermissions(userId);
        const userPermissionsSet = new Set(userPermissions);
        const missing = permissionNames.filter(name => !userPermissionsSet.has(name));
        return {
            hasAll: missing.length === 0,
            missing
        };
    }
    async batchAssignPermission(permissionId, userIds, grantedBy) {
        if (!permissionId) {
            throw new Error('Permission ID is required');
        }
        if (!userIds || userIds.length === 0) {
            throw new Error('At least one user ID is required');
        }
        if (!grantedBy) {
            throw new Error('Granted by user ID is required');
        }
        const permission = await this.permissionRepository.findById(permissionId);
        if (!permission) {
            throw new Error(`Permission with id ${permissionId} not found`);
        }
        for (const userId of userIds) {
            await this.permissionRepository.assignPermissionsToUser(userId, [permissionId], grantedBy);
        }
    }
    mapToDto(permission) {
        return {
            id: permission.id,
            name: permission.name,
            description: permission.description,
            created_at: permission.created_at,
        };
    }
}
exports.PermissionUseCases = PermissionUseCases;
//# sourceMappingURL=permission.use-case.js.map