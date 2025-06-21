export interface IPermissionRepository {
    getPermissionsForAdmin(adminId: string): Promise<any[]>
    getPermissionsForShift(shiftId: string): Promise<any[]>
    create(permissionData: any): Promise<any>
    findById(permissionId: string): Promise<any | null>
    update(permissionId: string, permissionData: any): Promise<any | null>
    delete(permissionId: string): Promise<boolean>
}