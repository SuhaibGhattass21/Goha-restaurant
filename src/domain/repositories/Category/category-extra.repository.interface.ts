import { CreateCategoryExtraDto, UpdateCategoryExtraDto } from "@application/dtos/Category/category-extra.dto";
import { CategoryExtra } from "@infrastructure/database/models";

export interface ICategoryExtraRepository {
    create(extraData: CreateCategoryExtraDto): Promise<CategoryExtra>
    findById(id: string): Promise<CategoryExtra | null>
    findByName(name: string): Promise<CategoryExtra | null>
    findByCategoryId(categoryId: string): Promise<CategoryExtra[]>
    findAll(page?: number, limit?: number): Promise<{ extras: CategoryExtra[]; total: number }>
    update(id: string, extraData: UpdateCategoryExtraDto): Promise<CategoryExtra | null>
    delete(id: string): Promise<boolean>
}