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
    getPermissionsForAdmin(adminId: string): Promise<any[]> {
        return this.useCase.getPermissionsForAdmin(adminId);
    }

    getPermissionsForShift(shiftId: string): Promise<any[]> {
        return this.useCase.getPermissionsForShift(shiftId);
    }
}
