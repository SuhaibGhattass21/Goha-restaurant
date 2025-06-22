import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';

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
