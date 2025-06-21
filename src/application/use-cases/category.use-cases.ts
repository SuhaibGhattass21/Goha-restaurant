import { ICategoryRepository } from "@domain/repositories/category.repository.interface"
import type { Category } from "../../infrastructure/database/models/Category.model"
import { CreateCategoryDto, CategoryResponseDto, CategoryListResponseDto, UpdateCategoryDto } from "@application/dtos/category.dto"

export class CategoryUseCases {
  constructor(private categoryRepository: ICategoryRepository) { }

  async createCategory(categoryData: CreateCategoryDto): Promise<CategoryResponseDto> {
    // Check if category with same name already exists
    const existingCategory = await this.categoryRepository.findByName(categoryData.name)
    if (existingCategory) {
      throw new Error("Category with this name already exists")
    }

    const category = await this.categoryRepository.create(categoryData)
    return this.mapToResponseDto(category)
  }

  async getCategoryById(id: string): Promise<CategoryResponseDto | null> {
    const category = await this.categoryRepository.findById(id)
    return category ? this.mapToResponseDto(category) : null
  }

  async getAllCategories(page = 1, limit = 10): Promise<CategoryListResponseDto> {
    const { categories, total } = await this.categoryRepository.findAll(page, limit)

    return {
      categories: categories.map((category: any) => this.mapToResponseDto(category)),
      total,
      page,
      limit,
    }
  }

  async updateCategory(id: string, categoryData: UpdateCategoryDto): Promise<CategoryResponseDto | null> {
    // If name is being updated, check for duplicates
    if (categoryData.name) {
      const existingCategory = await this.categoryRepository.findByName(categoryData.name)
      if (existingCategory && existingCategory.category_id !== id) {
        throw new Error("Category with this name already exists")
      }
    }

    const category = await this.categoryRepository.update(id, categoryData)
    return category ? this.mapToResponseDto(category) : null
  }

  async deleteCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      return false
    }

    return await this.categoryRepository.delete(id)
  }

  private mapToResponseDto(category: Category): CategoryResponseDto {
    return {
      category_id: category.category_id,
      name: category.name,
      description: category.description,
      products: category.products || [],
      sizes: category.sizes || [],
      extras: category.extras || [],
    }
  }
}
