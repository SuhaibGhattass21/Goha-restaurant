import { CreatePermissionDto, PermissionResponseDto, UpdatePermissionDto } from '../dtos/Permission.dto';
import { Permissions } from '../../infrastructure/database/models/userPersmissions.model';
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

    private mapToDto(permission: Permissions): PermissionResponseDto {
        return {
            id: permission.id,
            name: permission.name,
            description: permission.description,
            granted_by: permission.granted_by.id,
            granted_at: permission.granted_at,
            is_revoked: permission.is_revoked,
        };
    }

    async getPermissionsForAdmin(adminId: string): Promise<any[]> {
        return this.permissionRepository.getPermissionsForAdmin(adminId);
    }

    async getPermissionsForShift(shiftId: string): Promise<any[]> {
        return this.permissionRepository.getPermissionsForShift(shiftId);
    }
}
