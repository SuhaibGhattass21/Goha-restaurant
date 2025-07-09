import type { Repository } from "typeorm";
import type { CategoryExtra } from "../../database/models/CategoryExtra.model";
import type { Category } from "../../database/models/Category.model";
import type { CreateCategoryExtraDto, UpdateCategoryExtraDto } from "../../../application/dtos/Category/category-extra.dto";
import { ICategoryExtraRepository } from "@domain/repositories/Category/category-extra.repository.interface";
export declare class CategoryExtraRepositoryImpl implements ICategoryExtraRepository {
    private categoryExtraRepository;
    private categoryRepository;
    constructor(categoryExtraRepository: Repository<CategoryExtra>, categoryRepository: Repository<Category>);
    create(extraData: CreateCategoryExtraDto): Promise<CategoryExtra>;
    findById(id: string): Promise<CategoryExtra | null>;
    findByName(name: string): Promise<CategoryExtra | null>;
    findByCategoryId(categoryId: string): Promise<CategoryExtra[]>;
    findAll(page?: number, limit?: number): Promise<{
        extras: CategoryExtra[];
        total: number;
    }>;
    update(id: string, extraData: UpdateCategoryExtraDto): Promise<CategoryExtra | null>;
    delete(id: string): Promise<boolean>;
}
