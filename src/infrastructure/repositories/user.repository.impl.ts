import { User } from "../../infrastructure/database/models";
import { Repository } from "typeorm";
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { UserPermission } from "../../infrastructure/database/models";
export class UserRepositoryImpl implements IUserRepository {
    constructor(private userRepository: Repository<User>) { }
    create(data: User): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    async findById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: [
                'userPermissions',
                'userPermissions.permission'
            ]
        });

        if (user?.userPermissions) {
            // Filter out revoked permissions here
            user.userPermissions = user.userPermissions.filter(
                (up: UserPermission) => !up.is_revoked
            );
        }

        return user;
    }

    findBy(filter: any): Promise<User | null> {
        return this.userRepository.findOne({
            where: filter,
            relations: ["userPermissions", "userPermissions.permission"],
        });
    }
    update(id: string, data: Partial<User>): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } })
            .then(user => {
                if (!user) return null;
                Object.assign(user, data);
                return this.userRepository.save(user);
            });
    }
    delete(id: string): Promise<boolean> {
        return this.userRepository.delete(id)
            .then(result => result.affected ? true : false)
            .catch(() => false);
    }
    findAll(page: number, limit?: number): Promise<User[]> {
        const skip = (page - 1) * (limit || 0);
        return this.userRepository.find({
            skip,
            take: limit || 10,
            relations: ["userPermissions", "userPermissions.permission"],
        });
    }

}