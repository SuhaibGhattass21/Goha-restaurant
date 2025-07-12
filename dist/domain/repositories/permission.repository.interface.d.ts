import { Permissions } from '../../infrastructure/database/models/permissions.model';
import { CreatePermissionDto, UpdatePermissionDto } from '../../application/dtos/Permission.dto';
export interface IPermissionRepository {
    create(data: CreatePermissionDto): Promise<Permissions>;
    findById(id: string): Promise<Permissions | null>;
    findByName(name: string): Promise<Permissions | null>;
    update(id: string, data: UpdatePermissionDto): Promise<Permissions | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<Permissions[]>;
    assignPermissionsToUser(userId: string, permissions: string[], grantedBy: string, isRevoked?: boolean): Promise<void>;
    revokePermissionsFromUser(userId: string, permissions: string[]): Promise<void>;
    getUserPermissions(userId: string): Promise<string[]>;
    isPermissionAssignedToUser(userId: string, permissionId: string): Promise<boolean>;
    getAllPermissionsForUser(userId: string): Promise<any[]>;
    getAllUsersWithPermission(permissionId: string): Promise<any[]>;
}
