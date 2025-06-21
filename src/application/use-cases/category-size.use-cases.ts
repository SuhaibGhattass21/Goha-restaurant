import type { ICategorySizeRepository } from "@domain/repositories/category-size.repository.interface"
import type { ICategoryRepository } from "@domain/repositories/category.repository.interface"
import type {
  CreateCategorySizeDto,
  UpdateCategorySizeDto,
  CategorySizeResponseDto,
  CategorySizeListResponseDto
} from "../dtos/category-size.dto"
import type { CategorySize } from "@infrastructure/database/models/CategorySize.model"

export class CategorySizeUseCases {
  constructor(
    private categorySizeRepository: ICategorySizeRepository,
    private categoryRepository: ICategoryRepository
  ) { }

  async createCategorySize(sizeData: CreateCategorySizeDto): Promise<CategorySizeResponseDto> {
    // Check if category exists
    const category = await this.categoryRepository.findById(sizeData.category_id)
    if (!category) {
      throw new Error("Category not found")
    }

    // Check if size with same name already exists for this category
    const existingSize = await this.categorySizeRepository.findBySizeName(sizeData.size_name)
    if (existingSize && existingSize.category.category_id === sizeData.category_id) {
      throw new Error("Size with this name already exists for this category")
    }

    const size = await this.categorySizeRepository.create(sizeData)
    return this.mapToResponseDto(size)
  }

  async getCategorySizeById(id: string): Promise<CategorySizeResponseDto | null> {
    const size = await this.categorySizeRepository.findById(id)
    return size ? this.mapToResponseDto(size) : null
  }

  async getCategorySizesByCategoryId(categoryId: string): Promise<CategorySizeResponseDto[]> {
    const sizes = await this.categorySizeRepository.findByCategoryId(categoryId)
    return sizes.map(size => this.mapToResponseDto(size))
  }

  async getAllCategorySizes(page: number, limit: number): Promise<CategorySizeListResponseDto> {
    const { sizes, total } = await this.categorySizeRepository.findAll(page, limit)

    return {
      sizes: sizes.map(size => this.mapToResponseDto(size)),
      total,
      page,
      limit
    }
  }

  async updateCategorySize(id: string, sizeData: UpdateCategorySizeDto): Promise<CategorySizeResponseDto | null> {
    // Check if size exists
    const existingSize = await this.categorySizeRepository.findById(id)
    if (!existingSize) {
      return null
    }

    // If category_id is being updated, check if new category exists
    if (sizeData.category_id) {
      const category = await this.categoryRepository.findById(sizeData.category_id)
      if (!category) {
        throw new Error("Category not found")
      }
    }

    // Check for name conflicts if size_name is being updated
    if (sizeData.size_name) {
      const nameConflict = await this.categorySizeRepository.findBySizeName(sizeData.size_name)
      if (nameConflict && nameConflict.size_id !== id) {
        const categoryId = sizeData.category_id || existingSize.category.category_id
        if (nameConflict.category.category_id === categoryId) {
          throw new Error("Size with this name already exists for this category")
        }
      }
    }

    const updatedSize = await this.categorySizeRepository.update(id, sizeData)
    return updatedSize ? this.mapToResponseDto(updatedSize) : null
  }

  async deleteCategorySize(id: string): Promise<boolean> {
    return await this.categorySizeRepository.delete(id)
  }

  private mapToResponseDto(size: CategorySize): CategorySizeResponseDto {
    return {
      size_id: size.size_id,
      size_name: size.size_name,
      category: size.category ? {
        category_id: size.category.category_id,
        name: size.category.name
      } : undefined
    }
  }
}