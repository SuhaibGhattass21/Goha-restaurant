import { IsString, IsOptional, IsBoolean, IsUUID, IsArray, IsNotEmpty, IsPhoneNumber, IsNumber } from 'class-validator';
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - username
 *         - fullName
 *         - hourRate
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         fullName:
 *           type: string
 *         hourRate:
 *           type: number
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         userPermissions:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         hourRate:
 *           type: number
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         isActive:
 *           type: boolean
 *         userPermissions:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *
 *     UserResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         fullName:
 *           type: string
 *         hourRate:
 *           type: number
 *         phone:
 *           type: string
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         userPermissions:
 *           type: array
 *           items:
 *             type: string
 */

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsNumber()
    hourRate!: number;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    userPermissions?: string[];
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsNumber()
    hourRate?: number;


    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    userPermissions?: string[];
}

export class UserResponseDto {
    @IsUUID()
    id!: string;

    @IsString()
    username!: string;

    @IsString()
    fullName!: string;

    @IsNumber()
    hourRate!: number;

    @IsOptional()
    @IsString()
    phone?: string;

    createdAt!: Date;

    @IsBoolean()
    isActive!: boolean;

    @IsOptional()
    @IsArray()
    userPermissions?: string[];
}