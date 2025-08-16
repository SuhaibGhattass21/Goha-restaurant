import { UserResponseDto } from '../../application/dtos/user.dto';
import { AuthResponseDto, LoginDto, RegisterDto } from '../../application/dtos/auth.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../infrastructure/database/models/user.model';
import { Permissions, UserPermission } from '../../infrastructure/database/models';
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
export class AuthUseCases {
    private jwtSecret: string;
    private jwtExpiry: number;
    private bcryptRounds: number;

    constructor(private userRepository: IUserRepository) {
        this.jwtSecret = process.env.JWT_SECRET || 'c7btrc685v42c45v86c2';
        this.jwtExpiry = Number(process.env.JWT_EXPIRY) || 10000;
        this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    }

    async login(loginData: LoginDto): Promise<AuthResponseDto> {
        try {

            console.log(`User ${JSON.stringify(loginData)} is attempting to log in`);
            const user: User = await this.userRepository.findBy({ username: loginData.username });

            console.log(`User found: ${JSON.stringify(user)}`);

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            if (!user.isActive) {
                throw new Error('Account is deactivated');
            }

            const token = this.generateToken(user);

            console.log(`User ${JSON.stringify(user)} logged in`);

            const userPermissions = user.userPermissions
                ?.filter(up => !up.is_revoked) // filter revoked
                .map(up => ({
                    id: up.permission.id,
                    name: up.permission.name,
                    description: up.permission.description,
                    granted_at: up.granted_at,
                    granted_by_name: up.granted_by.username,
                    is_revoked: up.is_revoked
                })) || [];

            return {
                user: {
                    id: user.id,
                    username: user.username,
                    fullName: user.fullName,
                    phone: user.phone,
                    hourRate: user.hourRate,
                    createdAt: user.createdAt,
                    isActive: user.isActive,
                    userPermissions
                },
                token,
                expiresIn: this.jwtExpiry
            };
        } catch (error: any) {
            throw new Error(error.message || 'Login failed');
        }
    }

    async register(registerData: RegisterDto): Promise<AuthResponseDto> {
        try {
            const existingUser = await this.userRepository.findBy({ username: registerData.username });
            if (existingUser) {
                throw new Error('Username already exists');
            }

            const hashedPassword = await bcrypt.hash(registerData.password, this.bcryptRounds);

            const userData = {
                ...registerData,
                password: hashedPassword,
                isActive: true
            };

            const newUser = await this.userRepository.create(userData);

            const token = this.generateToken(newUser);

            return {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    fullName: newUser.fullName,
                    hourRate: newUser.hourRate,
                    createdAt: newUser.createdAt,
                    phone: newUser.phone,
                    isActive: newUser.isActive,
                    userPermissions: newUser.userPermissions
                },
                token,
                expiresIn: this.jwtExpiry
            };
        } catch (error: any) {
            throw new Error(error.message || 'Registration failed');
        }
    }

    async getUserProfile(userId: string): Promise<UserResponseDto> {
        try {
            const user = await this.userRepository.findBy({id:userId});
            if (!user) {
                throw new Error('User not found');
            }

            if (!user.isActive) {
                throw new Error('Account is deactivated');
            }

            const userPermissions = user.userPermissions
                ?.filter((up: UserPermission) => !up.is_revoked) // explicit type here
                .map((up: UserPermission) => ({
                    id: up.permission.id,
                    name: up.permission.name,
                    description: up.permission.description,
                    granted_at: up.granted_at,
                    granted_by_name: up.granted_by.username,
                    is_revoked: up.is_revoked
                })) || [];

            return {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                phone: user.phone,
                createdAt: user.createdAt,
                isActive: user.isActive,
                hourRate: user.hourRate,
                userPermissions
            };
        } catch (error: any) {
            throw new Error(error.message || 'Failed to get user profile');
        }
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    async refreshToken(userId: string): Promise<{ token: string; expiresIn: number }> {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user || !user.isActive) {
                throw new Error('User not found or inactive');
            }

            const token = this.generateToken(user);

            return {
                token,
                expiresIn: this.jwtExpiry
            };
        } catch (error: any) {
            throw new Error(error.message || 'Token refresh failed');
        }
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isOldPasswordValid) {
                throw new Error('Current password is incorrect');
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, this.bcryptRounds);

            await this.userRepository.update(userId, { password: hashedNewPassword });
        } catch (error: any) {
            throw new Error(error.message || 'Password change failed');
        }
    }

    private generateToken(user: User): string {
        const permissions = user.userPermissions?.map((permission: UserPermission) => permission.permission.name) || [];

        return jwt.sign(
            {
                userId: user.id,
                username: user.username,
                fullName: user.fullName,
                permissions
            },
            this.jwtSecret,
            { expiresIn: this.jwtExpiry }
        );
    }
}