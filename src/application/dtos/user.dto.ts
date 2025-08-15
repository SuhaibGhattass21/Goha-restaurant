import { IsString, IsOptional, IsBoolean, IsUUID, IsArray, IsNotEmpty, IsPhoneNumber, IsNumber, IsDate } from 'class-validator';
import { UserPermissionDetailDto } from './Permission.dto'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsOptional()
    @IsNumber()
    hourRate?: number;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsArray()
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

    @IsOptional()
    @IsNumber()
    hourRate?: number;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsDate()
    createdAt!: Date;

    @IsBoolean()
    isActive!: boolean;

    @IsOptional()
    @IsArray()
    userPermissions?: UserPermissionDetailDto[];

    @IsOptional()
    @IsUUID()
    worker_id?: string;
}