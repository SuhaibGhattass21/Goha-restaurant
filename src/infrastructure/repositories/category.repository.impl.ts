import type { Repository } from "typeorm"
import type { Category } from "../database/models/Category.model"
import type { CreateCategoryDto, UpdateCategoryDto } from "../../application/dtos/category.dto"
import { ICategoryRepository } from "@domain/repositories/category.repository.interface"

export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(private categoryRepository: Repository<Category>) { }

  async create(categoryData: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(categoryData)
    return await this.categoryRepository.save(category)
  }

  async findById(id: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ["products", "sizes", "extras"],
    })
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { name },
    })
  }

  async findAll(page = 1, limit = 10): Promise<{ categories: Category[]; total: number }> {
    const [categories, total] = await this.categoryRepository.findAndCount({
      relations: ["products", "sizes", "extras"],
      skip: (page - 1) * limit,
      take: limit,
      order: { name: "ASC" },
    })

    return { categories, total }
  }

  async update(id: string, categoryData: UpdateCategoryDto): Promise<Category | null> {
    await this.categoryRepository.update(id, categoryData)
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
