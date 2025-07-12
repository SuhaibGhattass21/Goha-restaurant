/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePermissionDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         granted_by:
 *           type: string
 *           format: uuid
 *
 *     UpdatePermissionDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         is_revoked:
 *           type: boolean
 *
 * PermissionResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "inventory:manage"
 *         description:
 *           type: string
 *           example: "Allows inventory management operations"
 *         granted_by:
 *           type: string
 *           format: uuid
 *         granted_at:
 *           type: string
 *           format: date-time
 *         is_revoked:
 *           type: boolean
 *           example: false
 */
export declare class CreatePermissionDto {
    name: string;
    description?: string;
}
export declare class UpdatePermissionDto {
    name?: string;
    description?: string;
    is_revoked?: boolean;
}
export declare class PermissionResponseDto {
    id: string;
    name: string;
    description?: string;
    created_at: Date;
}
export declare class AssignPermissionsDto {
    userId: string;
    permissionIds: string[];
    grantedBy: string;
}
export declare class RevokePermissionsDto {
    userId: string;
    permissionIds: string[];
}
export declare class CheckMultiplePermissionsDto {
    permissionNames: string[];
}
export declare class BatchAssignPermissionDto {
    permissionId: string;
    userIds: string[];
    granted_by: string;
}
export declare class UserPermissionsResponseDto {
    permissions: string[];
}
export declare class PermissionCheckResponseDto {
    hasPermission: boolean;
}
export declare class MultiplePermissionCheckResponseDto {
    permissions: Record<string, boolean>;
}
export declare class UserPermissionDetailDto {
    id: string;
    name: string;
    description?: string;
    granted_at: Date;
    granted_by_name: string;
    is_revoked: boolean;
}
export declare class UserWithPermissionDto {
    id: string;
    username: string;
    fullName: string;
    granted_at: Date;
    granted_by_name: string;
}
export declare class PermissionCheckResultDto {
    hasAll: boolean;
    missing: string[];
}
