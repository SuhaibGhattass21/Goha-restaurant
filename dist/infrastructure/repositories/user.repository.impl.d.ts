import { User } from "../../infrastructure/database/models";
import { Repository } from "typeorm";
export declare class UserRepositoryImpl implements IUserRepository {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(data: User): Promise<User>;
    findById(id: string): Promise<any | null>;
    findBy(filter: any): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    findAll(page: number, limit?: number): Promise<User[]>;
}
