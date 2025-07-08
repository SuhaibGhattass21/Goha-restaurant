import { AssignPermissionsDto, CreatePermissionDto, PermissionResponseDto, UpdatePermissionDto, BatchAssignPermissionDto, CheckMultiplePermissionsDto, UserPermissionDetailDto, UserPermissionsResponseDto, PermissionCheckResponseDto, MultiplePermissionCheckResponseDto, PermissionCheckResultDto } from '../dtos/Permission.dto';
import { Permissions } from '../../infrastructure/database/models/permissions.model';
import { IPermissionRepository } from '../../domain/repositories/permission.repository.interface';

export class PermissionUseCases {
    constructor(private permissionRepository: IPermissionRepository) { }

    async create(data: CreatePermissionDto): Promise<PermissionResponseDto> {
        const existing = await this.permissionRepository.findByName(data.name);
        if (existing) throw new Error('Permission already exists');

        const permission = await this.permissionRepository.create(data);
        return this.mapToDto(permission);
    }

    async update(id: string, data: UpdatePermissionDto): Promise<PermissionResponseDto | null> {
        const updated = await this.permissionRepository.update(id, data);
        return updated ? this.mapToDto(updated) : null;
    }

    async findById(id: string): Promise<PermissionResponseDto | null> {
        const permission = await this.permissionRepository.findById(id);
        return permission ? this.mapToDto(permission) : null;
    }

    async findAll(): Promise<PermissionResponseDto[]> {
        const permissions = await this.permissionRepository.findAll();
        return permissions.map(p => this.mapToDto(p));
    }

    async delete(id: string): Promise<boolean> {
        return this.permissionRepository.delete(id);
    }

    async assignPermissionsToUser(userId: string, permissionIds: string[], grantedBy: string): Promise<void> {
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

    async revokePermissionsFromUser(userId: string, permissionIds: string[]): Promise<void> {

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

    async getUserPermissions(userId: string): Promise<string[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }

        return this.permissionRepository.getUserPermissions(userId);
    }

    async checkUserHasPermission(userId: string, permissionName: string): Promise<boolean> {
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

    async getAllPermissionsForUser(userId: string): Promise<any[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return this.permissionRepository.getAllPermissionsForUser(userId);
    }

    async getAllUsersWithPermission(permissionId: string): Promise<any[]> {
        if (!permissionId) {
            throw new Error('Permission ID is required');
        }
        const permission = await this.permissionRepository.findById(permissionId);
        if (!permission) {
            throw new Error(`Permission with id ${permissionId} not found`);
        }

        return this.permissionRepository.getAllUsersWithPermission(permissionId);
    }

    async checkMultiplePermissions(userId: string, permissionNames: string[]): Promise<{
        hasAll: boolean;
        missing: string[];
    }> {
        const userPermissions = await this.permissionRepository.getUserPermissions(userId);
        const userPermissionsSet = new Set(userPermissions);

        const missing = permissionNames.filter(name => !userPermissionsSet.has(name));

        return {
            hasAll: missing.length === 0,
            missing
        };
    }

    async batchAssignPermission(permissionId: string, userIds: string[], grantedBy: string): Promise<void> {

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

    private mapToDto(permission: Permissions): PermissionResponseDto {
        return {
            id: permission.id,
            name: permission.name,
            description: permission.description,
            created_at: permission.created_at,
        };
    }
}
