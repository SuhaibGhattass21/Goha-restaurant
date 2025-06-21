import type { Repository } from "typeorm"
import type { CategorySize } from "../../database/models/CategorySize.model"
import type { Category } from "../../database/models/Category.model"
import type { CreateCategorySizeDto, UpdateCategorySizeDto } from "../../../application/dtos/Category/category-size.dto"
import { ICategorySizeRepository } from "@domain/repositories/Category/category-size.repository.interface"

export class CategorySizeRepositoryImpl implements ICategorySizeRepository {
  constructor(
    private categorySizeRepository: Repository<CategorySize>,
    private categoryRepository: Repository<Category>
  ) { }

  async create(sizeData: CreateCategorySizeDto): Promise<CategorySize> {
    console.log("🔍 Creating size with data:", sizeData)

    // First, fetch the full Category object
    const category = await this.categoryRepository.findOne({
      where: { category_id: sizeData.category_id }
    })

    if (!category) {
      throw new Error("Category not found")
    }

    // Create the CategorySize with the full Category object
    const size = this.categorySizeRepository.create({
      size_name: sizeData.size_name,
      category: category  // Pass the full Category object, not just the ID
    })

    const savedSize = await this.categorySizeRepository.save(size)
    console.log("✅ Created size:", savedSize)
    return savedSize
  }

  async findById(id: string): Promise<CategorySize | null> {
    return await this.categorySizeRepository.findOne({
      where: { size_id: id },
      relations: ["category"],
    })
  }

  async findBySizeName(sizeName: string): Promise<CategorySize | null> {
    return await this.categorySizeRepository.findOne({
      where: { size_name: sizeName },
      relations: ["category"],
    })
  }

  async findByCategoryId(categoryId: string): Promise<CategorySize[]> {
    console.log("🔍 Searching for sizes with category_id:", categoryId)

    const sizes = await this.categorySizeRepository
      .createQueryBuilder("size")
      .leftJoinAndSelect("size.category", "category")
      .where("category.category_id = :categoryId", { categoryId })
      .getMany()

    console.log("🔍 Found sizes:", sizes.length)
    if (sizes.length > 0) {
      console.log("🔍 First size:", {
        size_id: sizes[0].size_id,
        size_name: sizes[0].size_name,
        category: sizes[0].category ? {
          category_id: sizes[0].category.category_id,
          name: sizes[0].category.name
        } : 'NO CATEGORY'
      })
    }
    return sizes
  }

  async findAll(page = 1, limit = 10): Promise<{ sizes: CategorySize[]; total: number }> {
    const [sizes, total] = await this.categorySizeRepository.findAndCount({
      relations: ["category"],
      skip: (page - 1) * limit,
      take: limit,
      order: { size_name: "ASC" },
    })

    console.log("🔍 FindAll - Found sizes:", sizes.length)
    return { sizes, total }
  }

  async update(id: string, sizeData: UpdateCategorySizeDto): Promise<CategorySize | null> {
    const updateData: any = {}

    if (sizeData.size_name) {
      updateData.size_name = sizeData.size_name
    }

    if (sizeData.category_id) {
      // Fetch the full Category object for update too
      const category = await this.categoryRepository.findOne({
        where: { category_id: sizeData.category_id }
      })

      if (!category) {
        throw new Error("Category not found")
      }

      updateData.category = category
    }

    await this.categorySizeRepository.update(id, updateData)
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.categorySizeRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}