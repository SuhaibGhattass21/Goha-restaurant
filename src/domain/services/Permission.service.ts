import { CreatePermissionDto, PermissionResponseDto, UpdatePermissionDto } from '../../application/dtos/Permission.dto';
import { PermissionUseCases } from '../../application/use-cases/permission.use-case';

export class PermissionService {
    constructor(private useCase: PermissionUseCases) { }

    create(data: CreatePermissionDto): Promise<PermissionResponseDto> {
        return this.useCase.create(data);
    }

    update(id: string, data: UpdatePermissionDto): Promise<PermissionResponseDto | null> {
        return this.useCase.update(id, data);
    }

    findById(id: string): Promise<PermissionResponseDto | null> {
        return this.useCase.findById(id);
    }

    findAll(): Promise<PermissionResponseDto[]> {
        return this.useCase.findAll();
    }

    delete(id: string): Promise<boolean> {
        return this.useCase.delete(id);
    }

    assignPermissionsToUser(userId: string, permissionIds: string[], grantedBy: string): Promise<void> {
        return this.useCase.assignPermissionsToUser(userId, permissionIds, grantedBy);
    }

    revokePermissionsFromUser(userId: string, permissionIds: string[]): Promise<void> {
        return this.useCase.revokePermissionsFromUser(userId, permissionIds);
    }

    batchAssignPermission(permissionId: string, userIds: string[], grantedBy: string): Promise<void> {
        return this.useCase.batchAssignPermission(permissionId, userIds, grantedBy);
    }

    getUserPermissions(userId: string): Promise<string[]> {
        return this.useCase.getUserPermissions(userId);
    }

    checkUserHasPermission(userId: string, permissionName: string): Promise<boolean> {
        return this.useCase.checkUserHasPermission(userId, permissionName);
    }

    getAllPermissionsForUser(userId: string): Promise<any[]> {
        return this.useCase.getAllPermissionsForUser(userId);
    }

    getAllUsersWithPermission(permissionId: string): Promise<any[]> {
        return this.useCase.getAllUsersWithPermission(permissionId);
    }

    checkMultiplePermissions(userId: string, permissionNames: string[]): Promise<{
        hasAll: boolean;
        missing: string[];
    }> {
        return this.useCase.checkMultiplePermissions(userId, permissionNames);
    }
}
