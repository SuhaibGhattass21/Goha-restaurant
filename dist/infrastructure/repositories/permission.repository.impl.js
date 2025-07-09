"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRepositoryImpl = void 0;
const db_1 = require("../database/postgres/db");
class PermissionRepositoryImpl {
    constructor(permissionRepo, userPermissionRepo, userRepo) {
        this.permissionRepo = permissionRepo;
        this.userPermissionRepo = userPermissionRepo;
        this.userRepo = userRepo;
    }
    async assignPermissionsToUser(userId, permissions, grantedBy, isRevoked = false) {
        const queryRunner = db_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            const grantedByUser = await this.userRepo.findOne({ where: { id: grantedBy } });
            if (!user || !grantedByUser) {
                throw new Error('User or granter not found');
            }
            for (const permissionId of permissions) {
                const permission = await this.permissionRepo.findOne({ where: { id: permissionId } });
                if (!permission)
                    continue;
                // Check if assignment already exists
                const existingAssignment = await this.userPermissionRepo.findOne({
                    where: {
                        user: { id: userId },
                        permission: { id: permissionId }
                    }
                });
                if (existingAssignment) {
                    // Update existing assignment
                    existingAssignment.is_revoked = isRevoked;
                    existingAssignment.granted_by = grantedByUser;
                    existingAssignment.granted_at = new Date();
                    await queryRunner.manager.save(existingAssignment);
                }
                else {
                    // Create new assignment
                    const userPermission = this.userPermissionRepo.create({
                        user,
                        permission,
                        granted_by: grantedByUser,
                        is_revoked: isRevoked
                    });
                    await queryRunner.manager.save(userPermission);
                }
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async revokePermissionsFromUser(userId, permissions) {
        const queryRunner = db_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const permissionId of permissions) {
                const userPermission = await this.userPermissionRepo.findOne({
                    where: {
                        user: { id: userId },
                        permission: { id: permissionId }
                    }
                });
                if (userPermission) {
                    userPermission.is_revoked = true;
                    await queryRunner.manager.save(userPermission);
                }
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getUserPermissions(userId) {
        const userPermissions = await this.userPermissionRepo.find({
            where: {
                user: { id: userId },
                is_revoked: false
            },
            relations: ['permission']
        });
        return userPermissions.map((up) => up.permission.name);
    }
    async isPermissionAssignedToUser(userId, permissionId) {
        const userPermission = await this.userPermissionRepo.findOne({
            where: {
                user: { id: userId },
                permission: { id: permissionId },
                is_revoked: false
            }
        });
        return !!userPermission;
    }
    async getAllPermissionsForUser(userId) {
        const userPermissions = await this.userPermissionRepo.find({
            where: { user: { id: userId } },
            relations: ['permission', 'granted_by'],
            order: { granted_at: 'DESC' }
        });
        return userPermissions.map((up) => ({
            id: up.permission.id,
            name: up.permission.name,
            description: up.permission.description,
            granted_at: up.granted_at,
            granted_by_name: up.granted_by.fullName,
            is_revoked: up.is_revoked
        }));
    }
    async getAllUsersWithPermission(permissionId) {
        const userPermissions = await this.userPermissionRepo.find({
            where: {
                permission: { id: permissionId },
                is_revoked: false
            },
            relations: ['user', 'granted_by'],
            order: { granted_at: 'DESC' }
        });
        return userPermissions.map((up) => ({
            id: up.user.id,
            username: up.user.username,
            fullName: up.user.fullName,
            granted_at: up.granted_at,
            granted_by_name: up.granted_by.fullName
        }));
    }
    async create(data) {
        const permission = this.permissionRepo.create({
            name: data.name,
            description: data.description,
        });
        return await this.permissionRepo.save(permission);
    }
    async findById(id) {
        return await this.permissionRepo.findOne({
            where: { id },
        });
    }
    async findByName(name) {
        return await this.permissionRepo.findOne({
            where: { name },
        });
    }
    async update(id, data) {
        const permission = await this.permissionRepo.findOne({ where: { id } });
        if (!permission)
            return null;
        Object.assign(permission, data);
        return await this.permissionRepo.save(permission);
    }
    async delete(id) {
        const result = await this.permissionRepo.delete(id);
        return (result.affected ?? 0) > 0;
    }
    async findAll() {
        return await this.permissionRepo.find({
            order: { created_at: 'DESC' },
        });
    }
    async getPermissionsForAdmin(adminId) {
        return db_1.AppDataSource.query(`SELECT * FROM admin_permissions_view WHERE admin_id = $1`, [adminId]);
    }
    async getPermissionsForShift(shiftId) {
        return db_1.AppDataSource.query(`SELECT * FROM admin_permissions_view WHERE shift_id = $1`, [shiftId]);
    }
}
exports.PermissionRepositoryImpl = PermissionRepositoryImpl;
//# sourceMappingURL=permission.repository.impl.js.map