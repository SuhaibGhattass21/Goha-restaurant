import { ICategoryRepository } from "@domain/repositories/Category/category.repository.interface";
import { CreateCategoryDto, CategoryResponseDto, CategoryListResponseDto, UpdateCategoryDto } from "@application/dtos/Category/category.dto";
export declare class CategoryUseCases {
    private categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    createCategory(categoryData: CreateCategoryDto): Promise<CategoryResponseDto>;
    getCategoryById(id: string): Promise<CategoryResponseDto | null>;
    getAllCategories(page?: number, limit?: number): Promise<CategoryListResponseDto>;
    updateCategory(id: string, categoryData: UpdateCategoryDto): Promise<CategoryResponseDto | null>;
    deleteCategory(id: string): Promise<boolean>;
    private mapToResponseDto;
}
