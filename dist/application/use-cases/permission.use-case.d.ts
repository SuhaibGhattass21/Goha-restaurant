import { CreatePermissionDto, PermissionResponseDto, UpdatePermissionDto } from '../dtos/Permission.dto';
import { IPermissionRepository } from '../../domain/repositories/permission.repository.interface';
export declare class PermissionUseCases {
    private permissionRepository;
    constructor(permissionRepository: IPermissionRepository);
    create(data: CreatePermissionDto): Promise<PermissionResponseDto>;
    update(id: string, data: UpdatePermissionDto): Promise<PermissionResponseDto | null>;
    findById(id: string): Promise<PermissionResponseDto | null>;
    findAll(): Promise<PermissionResponseDto[]>;
    delete(id: string): Promise<boolean>;
    assignPermissionsToUser(userId: string, permissionIds: string[], grantedBy: string): Promise<void>;
    revokePermissionsFromUser(userId: string, permissionIds: string[]): Promise<void>;
    getUserPermissions(userId: string): Promise<string[]>;
    checkUserHasPermission(userId: string, permissionName: string): Promise<boolean>;
    getAllPermissionsForUser(userId: string): Promise<any[]>;
    getAllUsersWithPermission(permissionId: string): Promise<any[]>;
    checkMultiplePermissions(userId: string, permissionNames: string[]): Promise<{
        hasAll: boolean;
        missing: string[];
    }>;
    batchAssignPermission(permissionId: string, userIds: string[], grantedBy: string): Promise<void>;
    private mapToDto;
}
