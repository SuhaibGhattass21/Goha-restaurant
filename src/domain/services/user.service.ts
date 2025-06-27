import type { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../application/dtos/user.dto';
import { UserUseCases } from '../../application/use-cases/user.use-case';

export class UserService {
  constructor(private userUseCase: UserUseCases) { }

  createUser(data: CreateUserDto): Promise<UserResponseDto> {
    return this.userUseCase.createUser(data);
  }

  getUserById(id: string): Promise<UserResponseDto | null> {
    return this.userUseCase.getUserById(id);
  }

  getAllUsers(page: number, limit: number): Promise<UserResponseDto[]> {
    return this.userUseCase.getAllUsers(page, limit);
  }

  updateUser(id: string, data: UpdateUserDto): Promise<UserResponseDto | null> {
    return this.userUseCase.updateUser(id, data);
  }

  deleteUser(id: string): Promise<boolean> {
    return this.userUseCase.deleteUser(id);
  }

  assignPermissions(userId: string, permissions: string[]): Promise<UserResponseDto | null> {
    return this.userUseCase.assignPermissionsToUser(userId, permissions);
  }
}
