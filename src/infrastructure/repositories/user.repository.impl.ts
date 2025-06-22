import { User } from "../../infrastructure/database/models";
import { Repository } from "typeorm";

export class UserRepositoryImpl implements IUserRepository {
    constructor(private userRepository: Repository<User>) { }
    create(data: User): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
    findById(id: string): Promise<any | null> {
        return this.userRepository.findOne({
            where: { id },
            relations: ["userPermissions"]
        });
    }
    findBy(filter: any): Promise<User | null> {
        return this.userRepository.findOne({
            where: filter,
            relations: ["userPermissions"]
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
            relations: ["user_permissions"],
        });
    }

}