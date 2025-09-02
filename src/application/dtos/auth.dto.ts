import { IsString, IsNotEmpty, MinLength, IsOptional, IsNumber } from 'class-validator';
import { UserResponseDto } from './user.dto';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsNotEmpty()
    hourRate!: number;
}

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    oldPassword!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword!: string;
}

export class AuthResponseDto {

    @IsNotEmpty()
    user!: UserResponseDto

    @IsString()
    @IsNotEmpty()
    token!: string;

    @IsNumber()
    @IsNotEmpty()
    expiresIn!: number;
}