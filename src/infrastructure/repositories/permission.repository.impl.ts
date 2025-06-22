import { Repository } from 'typeorm';
import { Permissions } from '../database/models/userPersmissions.model';
import { IPermissionRepository } from '../../domain/repositories/permission.repository.interface';
import { CreatePermissionDto, UpdatePermissionDto } from '../../application/dtos/Permission.dto';
import { AppDataSource } from '../database/postgres/db';

export class PermissionRepositoryImpl implements IPermissionRepository {
    constructor(private permissionRepo: Repository<Permissions>) { }

    async create(data: CreatePermissionDto): Promise<Permissions> {
        const permission = this.permissionRepo.create({
            name: data.name,
            description: data.description,
            granted_by: { id: data.granted_by },
        });
        return await this.permissionRepo.save(permission);
    }

    async findById(id: string): Promise<Permissions | null> {
        return await this.permissionRepo.findOne({
            where: { id },
            relations: ['granted_by'],
        });
    }

    async findByName(name: string): Promise<Permissions | null> {
        return await this.permissionRepo.findOne({
            where: { name },
            relations: ['granted_by'],
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
            relations: ['granted_by'],
            order: { granted_at: 'DESC' },
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
