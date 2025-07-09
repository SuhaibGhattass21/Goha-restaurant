import { Repository } from 'typeorm';
import { Permissions } from '../database/models/permissions.model';
import { UserPermission } from '../database/models/userPermissions.model';
import { User } from '../database/models/user.model';
import { IPermissionRepository } from '../../domain/repositories/permission.repository.interface';
import { CreatePermissionDto, UpdatePermissionDto } from '../../application/dtos/Permission.dto';
export declare class PermissionRepositoryImpl implements IPermissionRepository {
    private permissionRepo;
    private userPermissionRepo;
    private userRepo;
    constructor(permissionRepo: Repository<Permissions>, userPermissionRepo: Repository<UserPermission>, userRepo: Repository<User>);
    assignPermissionsToUser(userId: string, permissions: string[], grantedBy: string, isRevoked?: boolean): Promise<void>;
    revokePermissionsFromUser(userId: string, permissions: string[]): Promise<void>;
    getUserPermissions(userId: string): Promise<string[]>;
    isPermissionAssignedToUser(userId: string, permissionId: string): Promise<boolean>;
    getAllPermissionsForUser(userId: string): Promise<any[]>;
    getAllUsersWithPermission(permissionId: string): Promise<any[]>;
    create(data: CreatePermissionDto): Promise<Permissions>;
    findById(id: string): Promise<Permissions | null>;
    findByName(name: string): Promise<Permissions | null>;
    update(id: string, data: UpdatePermissionDto): Promise<Permissions | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<Permissions[]>;
    getPermissionsForAdmin(adminId: string): Promise<any[]>;
    getPermissionsForShift(shiftId: string): Promise<any[]>;
}
