import { IPermissionRepository } from '@domain/repositories/permission.repository.interface';
import { AppDataSource } from '../database/postgres/db';

export class PermissionRepository implements IPermissionRepository {
    create(permissionData: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findById(permissionId: string): Promise<any | null> {
        throw new Error('Method not implemented.');
    }
    update(permissionId: string, permissionData: any): Promise<any | null> {
        throw new Error('Method not implemented.');
    }
    delete(permissionId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
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
