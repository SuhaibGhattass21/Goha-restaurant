import { UserResponseDto } from './user.dto';
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class RegisterDto {
    username: string;
    fullName: string;
    password: string;
    phone?: string;
    hourRate: number;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
export declare class AuthResponseDto {
    user: UserResponseDto;
    token: string;
    expiresIn: number;
}
