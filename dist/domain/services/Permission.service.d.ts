import { CreatePermissionDto, PermissionResponseDto, UpdatePermissionDto } from '../../application/dtos/Permission.dto';
import { PermissionUseCases } from '../../application/use-cases/permission.use-case';
export declare class PermissionService {
    private useCase;
    constructor(useCase: PermissionUseCases);
    create(data: CreatePermissionDto): Promise<PermissionResponseDto>;
    update(id: string, data: UpdatePermissionDto): Promise<PermissionResponseDto | null>;
    findById(id: string): Promise<PermissionResponseDto | null>;
    findAll(): Promise<PermissionResponseDto[]>;
    delete(id: string): Promise<boolean>;
    assignPermissionsToUser(userId: string, permissionIds: string[], grantedBy: string): Promise<void>;
    revokePermissionsFromUser(userId: string, permissionIds: string[]): Promise<void>;
    batchAssignPermission(permissionId: string, userIds: string[], grantedBy: string): Promise<void>;
    getUserPermissions(userId: string): Promise<string[]>;
    checkUserHasPermission(userId: string, permissionName: string): Promise<boolean>;
    getAllPermissionsForUser(userId: string): Promise<any[]>;
    getAllUsersWithPermission(permissionId: string): Promise<any[]>;
    checkMultiplePermissions(userId: string, permissionNames: string[]): Promise<{
        hasAll: boolean;
        missing: string[];
    }>;
}
