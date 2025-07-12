import type { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../application/dtos/user.dto';
import { UserUseCases } from '../../application/use-cases/user.use-case';
export declare class UserService {
    private userUseCase;
    constructor(userUseCase: UserUseCases);
    createUser(data: CreateUserDto): Promise<UserResponseDto>;
    getUserById(id: string): Promise<UserResponseDto | null>;
    getAllUsers(page: number, limit: number): Promise<UserResponseDto[]>;
    updateUser(id: string, data: UpdateUserDto): Promise<UserResponseDto | null>;
    deleteUser(id: string): Promise<boolean>;
    assignPermissions(userId: string, permissions: string[]): Promise<UserResponseDto | null>;
}
