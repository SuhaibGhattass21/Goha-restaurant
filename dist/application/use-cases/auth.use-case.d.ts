import { UserResponseDto } from '../../application/dtos/user.dto';
import { AuthResponseDto, LoginDto, RegisterDto } from '../../application/dtos/auth.dto';
export declare class AuthUseCases {
    private userRepository;
    private jwtSecret;
    private jwtExpiry;
    private bcryptRounds;
    constructor(userRepository: IUserRepository);
    login(loginData: LoginDto): Promise<AuthResponseDto>;
    register(registerData: RegisterDto): Promise<AuthResponseDto>;
    getUserProfile(userId: string): Promise<UserResponseDto>;
    verifyToken(token: string): any;
    refreshToken(userId: string): Promise<{
        token: string;
        expiresIn: number;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
    private generateToken;
}
