"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCases = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthUseCases {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = process.env.JWT_SECRET || 'c7btrc685v42c45v86c2';
        this.jwtExpiry = Number(process.env.JWT_EXPIRY) || 10000;
        this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    }
    async login(loginData) {
        try {
            const user = await this.userRepository.findBy({ username: loginData.username });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const isPasswordValid = await bcrypt_1.default.compare(loginData.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            if (!user.isActive) {
                throw new Error('Account is deactivated');
            }
            const token = this.generateToken(user);
            const userPermissions = user.userPermissions?.map((permission) => permission.id) || [];
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
        }
        catch (error) {
            throw new Error(error.message || 'Login failed');
        }
    }
    async register(registerData) {
        try {
            const existingUser = await this.userRepository.findBy({ username: registerData.username });
            if (existingUser) {
                throw new Error('Username already exists');
            }
            const hashedPassword = await bcrypt_1.default.hash(registerData.password, this.bcryptRounds);
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
        }
        catch (error) {
            throw new Error(error.message || 'Registration failed');
        }
    }
    async getUserProfile(userId) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.isActive) {
                throw new Error('Account is deactivated');
            }
            const userPermissions = user.userPermissions || [];
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
        }
        catch (error) {
            throw new Error(error.message || 'Failed to get user profile');
        }
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.jwtSecret);
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    async refreshToken(userId) {
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
        }
        catch (error) {
            throw new Error(error.message || 'Token refresh failed');
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const isOldPasswordValid = await bcrypt_1.default.compare(oldPassword, user.password);
            if (!isOldPasswordValid) {
                throw new Error('Current password is incorrect');
            }
            const hashedNewPassword = await bcrypt_1.default.hash(newPassword, this.bcryptRounds);
            await this.userRepository.update(userId, { password: hashedNewPassword });
        }
        catch (error) {
            throw new Error(error.message || 'Password change failed');
        }
    }
    generateToken(user) {
        const permissions = user.userPermissions?.map((p) => p.permission.id) || [];
        return jsonwebtoken_1.default.sign({
            userId: user.id,
            username: user.username,
            fullName: user.fullName,
            permissions
        }, this.jwtSecret, { expiresIn: this.jwtExpiry });
    }
}
exports.AuthUseCases = AuthUseCases;
//# sourceMappingURL=auth.use-case.js.map