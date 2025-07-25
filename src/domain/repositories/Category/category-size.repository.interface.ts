import { CreateCategorySizeDto, UpdateCategorySizeDto } from "@application/dtos/Category/category-size.dto";
import { CategorySize } from "@infrastructure/database/models";

export interface ICategorySizeRepository {
    create(sizeData: CreateCategorySizeDto): Promise<CategorySize>
    findById(id: string): Promise<CategorySize | null>
    findBySizeName(sizeName: string): Promise<CategorySize | null>
    findByCategoryId(categoryId: string): Promise<CategorySize[]>
    findAll(page?: number, limit?: number): Promise<{ sizes: CategorySize[]; total: number }>
    update(id: string, sizeData: UpdateCategorySizeDto): Promise<CategorySize | null>
    delete(id: string): Promise<boolean>
}