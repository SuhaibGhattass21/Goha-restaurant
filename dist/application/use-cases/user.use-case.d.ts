import { CreateUserDto, UserResponseDto } from "../../application/dtos/user.dto";
export declare class UserUseCases {
    private userRepository;
    constructor(userRepository: IUserRepository);
    createUser(userData: CreateUserDto): Promise<UserResponseDto>;
    getUserById(id: string): Promise<UserResponseDto | null>;
    getUserByUsername(username: string): Promise<UserResponseDto | null>;
    getAllUsers(page?: number, limit?: number): Promise<UserResponseDto[]>;
    updateUser(id: string, userData: Partial<CreateUserDto>): Promise<UserResponseDto | null>;
    deleteUser(id: string): Promise<boolean>;
    assignPermissionsToUser(userId: string, permissions: string[]): Promise<UserResponseDto | null>;
    private mapToResponseDto;
}
