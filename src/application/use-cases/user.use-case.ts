import {
  CreateUserDto,
  UserResponseDto,
} from "../../application/dtos/user.dto";
import { User } from "../../infrastructure/database/models";
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import bcrypt from 'bcrypt';

export class UserUseCases {
  constructor(private userRepository: IUserRepository) { }

  async createUser(userData: CreateUserDto): Promise<UserResponseDto> {
    const existingUserByUsername = await this.userRepository.findBy({
      username: userData.username,
    });
    if (existingUserByUsername) {
      throw new Error("Username already exists");
    }

    const existingUserByPhone = await this.userRepository.findBy({
      phone: userData.phone,
    });
    if (existingUserByPhone) {
      throw new Error("Phone number already exists");
    }
    const password = await bcrypt.hash(
      userData.password,
      parseInt(process.env.BCRYPT_ROUNDS || "12")
    );

    const user = await this.userRepository.create({ ...userData, password, isActive: true });
    return this.mapToResponseDto(user);
  }
  async getUserById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    return this.mapToResponseDto(user);
  }

  async getUserByUsername(username: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findBy({ username });
    if (!user) return null;

    return this.mapToResponseDto(user);
  }

  async getAllUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll(page, limit);
    return users.map((user) => this.mapToResponseDto(user));
  }
  async updateUser(
    id: string,
    userData: Partial<CreateUserDto>
  ): Promise<UserResponseDto | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (userData.username) {
      const existingUserByUsername = await this.userRepository.findBy({
        username: userData.username,
      });
      if (existingUserByUsername && existingUserByUsername.id !== id) {
        throw new Error("Username already exists");
      }
    }

    if (userData.phone) {
      const existingUserByPhone = await this.userRepository.findBy({
        phone: userData.phone,
      });
      if (existingUserByPhone && existingUserByPhone.id !== id) {
        throw new Error("Phone number already exists");
      }
    }

    const updatedUser = await this.userRepository.update(id, userData);
    return updatedUser ? this.mapToResponseDto(updatedUser) : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) return false;

    return await this.userRepository.delete(id);
  }

  async assignPermissionsToUser(
    userId: string,
    permissions: string[]
  ): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.permissions = [...new Set([...user.permissions, ...permissions])];
    const updatedUser = await this.userRepository.update(userId, {
      permissions: user.permissions,
    });

    return updatedUser ? this.mapToResponseDto(updatedUser) : null;
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      hourRate: user.hourRate,
      phone: user.phone,
      isActive: user.isActive,
      createdAt: user.createdAt,
      userPermissions: user.userPermissions?.map(up => ({
        id: up.permission.id,
        name: up.permission.name,
        description: up.permission.description,
        granted_at: up.granted_at,
        granted_by_name: up.granted_by.username,
        is_revoked: up.is_revoked
      })) || []
    };
  }

}
