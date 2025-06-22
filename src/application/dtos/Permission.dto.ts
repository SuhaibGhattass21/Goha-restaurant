import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
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

    @IsUUID()
    granted_by!: string;
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

    @IsUUID()
    granted_by!: string;

    granted_at!: Date;

    @IsBoolean()
    is_revoked!: boolean;
}
