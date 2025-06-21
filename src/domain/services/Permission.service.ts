import { PermissionRepository } from '../../infrastructure/repositories/permission.repository.impl';

export class PermissionService {
    private permissionRepo = new PermissionRepository();

    async getPermissionsForAdmin(adminId: string) {
        return this.permissionRepo.getPermissionsForAdmin(adminId);
    }

    async getPermissionsForShift(shiftId: string) {
        return this.permissionRepo.getPermissionsForShift(shiftId);
    }
}
