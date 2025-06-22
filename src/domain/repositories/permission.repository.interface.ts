import { Permissions } from '../../infrastructure/database/models/userPersmissions.model';
import { CreatePermissionDto, UpdatePermissionDto } from '../../application/dtos/Permission.dto';

export interface IPermissionRepository {
    create(data: CreatePermissionDto): Promise<Permissions>;
    findById(id: string): Promise<Permissions | null>;
    findByName(name: string): Promise<Permissions | null>;
    update(id: string, data: UpdatePermissionDto): Promise<Permissions | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<Permissions[]>;
    getPermissionsForAdmin(adminId: string): Promise<any[]>;
    getPermissionsForShift(shiftId: string): Promise<any[]>;
}
