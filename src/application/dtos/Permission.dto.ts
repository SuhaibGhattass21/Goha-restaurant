import { IsString, IsUUID, IsOptional, IsBoolean, IsArray, IsObject } from 'class-validator';
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

export class CreatePermissionDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdatePermissionDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    is_revoked?: boolean;
}

export class PermissionResponseDto {
    @IsUUID()
    id!: string;

    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    created_at!: Date;
}

export class AssignPermissionsDto {
    @IsUUID()
    userId!: string;

    @IsArray()
    @IsUUID('all', { each: true })
    permissionIds!: string[];

    @IsUUID()
    grantedBy!: string;
}

export class RevokePermissionsDto {
    @IsUUID()
    userId!: string;

    @IsArray()
    @IsUUID('all', { each: true })
    permissionIds!: string[];
}

export class CheckMultiplePermissionsDto {
    @IsArray()
    @IsString({ each: true })
    permissionNames!: string[];
}

export class BatchAssignPermissionDto {
    @IsUUID()
    permissionId!: string;

    @IsArray()
    @IsUUID('all', { each: true })
    userIds!: string[];

    @IsUUID()
    granted_by!: string;
}

export class UserPermissionsResponseDto {
    @IsArray()
    @IsString({ each: true })
    permissions!: string[];
}

export class PermissionCheckResponseDto {
    @IsBoolean()
    hasPermission!: boolean;
}

export class MultiplePermissionCheckResponseDto {
    @IsObject()
    permissions!: Record<string, boolean>;
}

export class UserPermissionDetailDto {
    @IsUUID()
    id!: string;

    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    granted_at!: Date;

    @IsString()
    granted_by_name!: string;

    @IsBoolean()
    is_revoked!: boolean;
}

export class UserWithPermissionDto {
    @IsUUID()
    id!: string;

    @IsString()
    username!: string;

    @IsString()
    fullName!: string;

    granted_at!: Date;

    @IsString()
    granted_by_name!: string;
}

export class PermissionCheckResultDto {
    @IsBoolean()
    hasAll!: boolean;

    @IsArray()
    @IsString({ each: true })
    missing!: string[];
}