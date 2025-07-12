import type { ICategoryExtraRepository } from "@domain/repositories/Category/category-extra.repository.interface";
import type { ICategoryRepository } from "@domain/repositories/Category/category.repository.interface";
import type { CreateCategoryExtraDto, UpdateCategoryExtraDto, CategoryExtraResponseDto, CategoryExtraListResponseDto } from "../../dtos/Category/category-extra.dto";
export declare class CategoryExtraUseCases {
    private categoryExtraRepository;
    private categoryRepository;
    constructor(categoryExtraRepository: ICategoryExtraRepository, categoryRepository: ICategoryRepository);
    createCategoryExtra(extraData: CreateCategoryExtraDto): Promise<CategoryExtraResponseDto>;
    getCategoryExtraById(id: string): Promise<CategoryExtraResponseDto | null>;
    getCategoryExtrasByCategoryId(categoryId: string): Promise<CategoryExtraResponseDto[]>;
    getAllCategoryExtras(page: number, limit: number): Promise<CategoryExtraListResponseDto>;
    updateCategoryExtra(id: string, extraData: UpdateCategoryExtraDto): Promise<CategoryExtraResponseDto | null>;
    deleteCategoryExtra(id: string): Promise<boolean>;
    private mapToResponseDto;
}
