import type { Repository } from "typeorm";
import type { CategorySize } from "../../database/models/CategorySize.model";
import type { Category } from "../../database/models/Category.model";
import type { CreateCategorySizeDto, UpdateCategorySizeDto } from "../../../application/dtos/Category/category-size.dto";
import { ICategorySizeRepository } from "@domain/repositories/Category/category-size.repository.interface";
export declare class CategorySizeRepositoryImpl implements ICategorySizeRepository {
    private categorySizeRepository;
    private categoryRepository;
    constructor(categorySizeRepository: Repository<CategorySize>, categoryRepository: Repository<Category>);
    create(sizeData: CreateCategorySizeDto): Promise<CategorySize>;
    findById(id: string): Promise<CategorySize | null>;
    findBySizeName(sizeName: string): Promise<CategorySize | null>;
    findByCategoryId(categoryId: string): Promise<CategorySize[]>;
    findAll(page?: number, limit?: number): Promise<{
        sizes: CategorySize[];
        total: number;
    }>;
    update(id: string, sizeData: UpdateCategorySizeDto): Promise<CategorySize | null>;
    delete(id: string): Promise<boolean>;
}
