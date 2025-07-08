import { Repository } from 'typeorm';
import { Permissions } from '../database/models/permissions.model';
import { UserPermission } from '../database/models/userPermissions.model';
import { User } from '../database/models/user.model';
import { IPermissionRepository } from '../../domain/repositories/permission.repository.interface';
import { CreatePermissionDto, UpdatePermissionDto } from '../../application/dtos/Permission.dto';
import { AppDataSource } from '../database/postgres/db';

export class PermissionRepositoryImpl implements IPermissionRepository {
    constructor(
        private permissionRepo: Repository<Permissions>,
        private userPermissionRepo: Repository<UserPermission>,
        private userRepo: Repository<User>
    ) { }

    async assignPermissionsToUser(userId: string, permissions: string[], grantedBy: string, isRevoked: boolean = false): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
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
                if (!permission) continue;

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
                } else {
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
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async revokePermissionsFromUser(userId: string, permissions: string[]): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
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
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getUserPermissions(userId: string): Promise<string[]> {
        const userPermissions = await this.userPermissionRepo.find({
            where: {
                user: { id: userId },
                is_revoked: false
            },
            relations: ['permission']
        });

        return userPermissions.map((up: UserPermission) => up.permission.name);
    }

    async isPermissionAssignedToUser(userId: string, permissionId: string): Promise<boolean> {
        const userPermission = await this.userPermissionRepo.findOne({
            where: {
                user: { id: userId },
                permission: { id: permissionId },
                is_revoked: false
            }
        });

        return !!userPermission;
    }

    async getAllPermissionsForUser(userId: string): Promise<any[]> {
        const userPermissions = await this.userPermissionRepo.find({
            where: { user: { id: userId } },
            relations: ['permission', 'granted_by'],
            order: { granted_at: 'DESC' }
        });

        return userPermissions.map((up: UserPermission) => ({
            id: up.permission.id,
            name: up.permission.name,
            description: up.permission.description,
            granted_at: up.granted_at,
            granted_by_name: up.granted_by.fullName,
            is_revoked: up.is_revoked
        }));
    }

    async getAllUsersWithPermission(permissionId: string): Promise<any[]> {
        const userPermissions = await this.userPermissionRepo.find({
            where: {
                permission: { id: permissionId },
                is_revoked: false
            },
            relations: ['user', 'granted_by'],
            order: { granted_at: 'DESC' }
        });

        return userPermissions.map((up: UserPermission) => ({
            id: up.user.id,
            username: up.user.username,
            fullName: up.user.fullName,
            granted_at: up.granted_at,
            granted_by_name: up.granted_by.fullName
        }));
    }
    async create(data: CreatePermissionDto): Promise<Permissions> {
        const permission = this.permissionRepo.create({
            name: data.name,
            description: data.description,
        });
        return await this.permissionRepo.save(permission);
    }

    async findById(id: string): Promise<Permissions | null> {
        return await this.permissionRepo.findOne({
            where: { id },
        });
    }

    async findByName(name: string): Promise<Permissions | null> {
        return await this.permissionRepo.findOne({
            where: { name },
        });
    }

    async update(id: string, data: UpdatePermissionDto): Promise<Permissions | null> {
        const permission = await this.permissionRepo.findOne({ where: { id } });
        if (!permission) return null;

        Object.assign(permission, data);
        return await this.permissionRepo.save(permission);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.permissionRepo.delete(id);
        return (result.affected ?? 0) > 0;
    }

    async findAll(): Promise<Permissions[]> {
        return await this.permissionRepo.find({
            order: { created_at: 'DESC' },
        });
    }

    async getPermissionsForAdmin(adminId: string): Promise<any[]> {
        return AppDataSource.query(
            `SELECT * FROM admin_permissions_view WHERE admin_id = $1`,
            [adminId]
        );
    }

    async getPermissionsForShift(shiftId: string): Promise<any[]> {
        return AppDataSource.query(
            `SELECT * FROM admin_permissions_view WHERE shift_id = $1`,
            [shiftId]
        );
    }
}
