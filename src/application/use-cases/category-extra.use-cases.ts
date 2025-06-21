import type { ICategoryExtraRepository } from "@domain/repositories/category-extra.repository.interface"
import type { ICategoryRepository } from "@domain/repositories/category.repository.interface"
import type {
  CreateCategoryExtraDto,
  UpdateCategoryExtraDto,
  CategoryExtraResponseDto,
  CategoryExtraListResponseDto
} from "../dtos/category-extra.dto"
import type { CategoryExtra } from "@infrastructure/database/models/CategoryExtra.model"

export class CategoryExtraUseCases {
  constructor(
    private categoryExtraRepository: ICategoryExtraRepository,
    private categoryRepository: ICategoryRepository
  ) { }

  async createCategoryExtra(extraData: CreateCategoryExtraDto): Promise<CategoryExtraResponseDto> {
    // Check if category exists
    const category = await this.categoryRepository.findById(extraData.category_id)
    if (!category) {
      throw new Error("Category not found")
    }

    // Check if extra with same name already exists for this category
    const existingExtra = await this.categoryExtraRepository.findByName(extraData.name)
    if (existingExtra && existingExtra.category.category_id === extraData.category_id) {
      throw new Error("Extra with this name already exists for this category")
    }

    const extra = await this.categoryExtraRepository.create(extraData)
    return this.mapToResponseDto(extra)
  }

  async getCategoryExtraById(id: string): Promise<CategoryExtraResponseDto | null> {
    const extra = await this.categoryExtraRepository.findById(id)
    return extra ? this.mapToResponseDto(extra) : null
  }

  async getCategoryExtrasByCategoryId(categoryId: string): Promise<CategoryExtraResponseDto[]> {
    const extras = await this.categoryExtraRepository.findByCategoryId(categoryId)
    return extras.map(extra => this.mapToResponseDto(extra))
  }

  async getAllCategoryExtras(page: number, limit: number): Promise<CategoryExtraListResponseDto> {
    const { extras, total } = await this.categoryExtraRepository.findAll(page, limit)

    return {
      extras: extras.map(extra => this.mapToResponseDto(extra)),
      total,
      page,
      limit
    }
  }

  async updateCategoryExtra(id: string, extraData: UpdateCategoryExtraDto): Promise<CategoryExtraResponseDto | null> {
    // Check if extra exists
    const existingExtra = await this.categoryExtraRepository.findById(id)
    if (!existingExtra) {
      return null
    }

    // If category_id is being updated, check if new category exists
    if (extraData.category_id) {
      const category = await this.categoryRepository.findById(extraData.category_id)
      if (!category) {
        throw new Error("Category not found")
      }
    }

    // Check for name conflicts if name is being updated
    if (extraData.name) {
      const nameConflict = await this.categoryExtraRepository.findByName(extraData.name)
      if (nameConflict && nameConflict.extra_id !== id) {
        const categoryId = extraData.category_id || existingExtra.category.category_id
        if (nameConflict.category.category_id === categoryId) {
          throw new Error("Extra with this name already exists for this category")
        }
      }
    }

    const updatedExtra = await this.categoryExtraRepository.update(id, extraData)
    return updatedExtra ? this.mapToResponseDto(updatedExtra) : null
  }

  async deleteCategoryExtra(id: string): Promise<boolean> {
    return await this.categoryExtraRepository.delete(id)
  }

  private mapToResponseDto(extra: CategoryExtra): CategoryExtraResponseDto {
    return {
      extra_id: extra.extra_id,
      name: extra.name,
      price: extra.price,
      category: extra.category ? {
        category_id: extra.category.category_id,
        name: extra.category.name
      } : undefined
    }
  }
}