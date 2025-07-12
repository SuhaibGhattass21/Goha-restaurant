export interface IUserRepository {
    create(data: any): Promise<any>;
    findById(id: string): Promise<any | null>;
    findBy(filter: any): Promise<any | null>;
    update(id: string, data: any): Promise<any | null>;
    delete(id: string): Promise<boolean>;
    findAll(page?: number, limit?: number): Promise<any[]>;
}