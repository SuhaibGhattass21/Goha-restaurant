"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCases = void 0;
class UserUseCases {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userData) {
        const existingUserByUsername = await this.userRepository.findBy({ username: userData.username });
        if (existingUserByUsername) {
            throw new Error("Username already exists");
        }
        const existingUserByPhone = await this.userRepository.findBy({ phone: userData.phone });
        if (existingUserByPhone) {
            throw new Error("Phone number already exists");
        }
        const user = await this.userRepository.create(userData);
        return this.mapToResponseDto(user);
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            return null;
        return this.mapToResponseDto(user);
    }
    async getUserByUsername(username) {
        const user = await this.userRepository.findBy({ username });
        if (!user)
            return null;
        return this.mapToResponseDto(user);
    }
    async getAllUsers(page = 1, limit = 10) {
        const users = await this.userRepository.findAll(page, limit);
        return users.map(user => this.mapToResponseDto(user));
    }
    async updateUser(id, userData) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (userData.username) {
            const existingUserByUsername = await this.userRepository.findBy({ username: userData.username });
            if (existingUserByUsername && existingUserByUsername.id !== id) {
                throw new Error("Username already exists");
            }
        }
        if (userData.phone) {
            const existingUserByPhone = await this.userRepository.findBy({ phone: userData.phone });
            if (existingUserByPhone && existingUserByPhone.id !== id) {
                throw new Error("Phone number already exists");
            }
        }
        const updatedUser = await this.userRepository.update(id, userData);
        return updatedUser ? this.mapToResponseDto(updatedUser) : null;
    }
    async deleteUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            return false;
        return await this.userRepository.delete(id);
    }
    async assignPermissionsToUser(userId, permissions) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.permissions = [...new Set([...user.permissions, ...permissions])];
        const updatedUser = await this.userRepository.update(userId, { permissions: user.permissions });
        return updatedUser ? this.mapToResponseDto(updatedUser) : null;
    }
    mapToResponseDto(user) {
        return {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            hourRate: user.hourRate,
            phone: user.phone,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
    }
}
exports.UserUseCases = UserUseCases;
//# sourceMappingURL=user.use-case.js.map