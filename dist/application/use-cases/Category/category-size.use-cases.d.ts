import type { ICategorySizeRepository } from "@domain/repositories/Category/category-size.repository.interface";
import type { ICategoryRepository } from "@domain/repositories/Category/category.repository.interface";
import type { CreateCategorySizeDto, UpdateCategorySizeDto, CategorySizeResponseDto, CategorySizeListResponseDto } from "../../dtos/Category/category-size.dto";
export declare class CategorySizeUseCases {
    private categorySizeRepository;
    private categoryRepository;
    constructor(categorySizeRepository: ICategorySizeRepository, categoryRepository: ICategoryRepository);
    createCategorySize(sizeData: CreateCategorySizeDto): Promise<CategorySizeResponseDto>;
    getCategorySizeById(id: string): Promise<CategorySizeResponseDto | null>;
    getCategorySizesByCategoryId(categoryId: string): Promise<CategorySizeResponseDto[]>;
    getAllCategorySizes(page: number, limit: number): Promise<CategorySizeListResponseDto>;
    updateCategorySize(id: string, sizeData: UpdateCategorySizeDto): Promise<CategorySizeResponseDto | null>;
    deleteCategorySize(id: string): Promise<boolean>;
    private mapToResponseDto;
}
