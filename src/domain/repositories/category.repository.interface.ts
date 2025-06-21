import { CreateCategoryDto, UpdateCategoryDto } from "@application/dtos/category.dto";
import { Category } from "@infrastructure/database/models";

export interface ICategoryRepository {
    create(categoryData: CreateCategoryDto): Promise<Category>
    findById(id: string): Promise<Category | null>
    findByName(name: string): Promise<Category | null>
    findAll(page?: number, limit?: number): Promise<{ categories: Category[]; total: number }>
    update(id: string, categoryData: UpdateCategoryDto): Promise<Category | null>
    delete(id: string): Promise<boolean>
}
