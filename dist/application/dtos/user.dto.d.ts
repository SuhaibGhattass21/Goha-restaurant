export declare class CreateUserDto {
    username: string;
    fullName: string;
    hourRate?: number;
    password: string;
    phone?: string;
    userPermissions?: string[];
}
export declare class UpdateUserDto {
    fullName?: string;
    hourRate?: number;
    password?: string;
    phone?: string;
    isActive?: boolean;
    userPermissions?: string[];
}
export declare class UserResponseDto {
    id: string;
    username: string;
    fullName: string;
    hourRate: number;
    phone?: string;
    createdAt: Date;
    isActive: boolean;
    userPermissions?: string[];
    worker_id?: string;
}
