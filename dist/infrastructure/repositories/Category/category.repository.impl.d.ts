import type { Repository } from "typeorm";
import type { Category } from "../../database/models/Category.model";
import type { CreateCategoryDto, UpdateCategoryDto } from "../../../application/dtos/Category/category.dto";
import { ICategoryRepository } from "@domain/repositories/Category/category.repository.interface";
export declare class CategoryRepositoryImpl implements ICategoryRepository {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(categoryData: CreateCategoryDto): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    findAll(page?: number, limit?: number): Promise<{
        categories: Category[];
        total: number;
    }>;
    update(id: string, categoryData: UpdateCategoryDto): Promise<Category | null>;
    delete(id: string): Promise<boolean>;
}
