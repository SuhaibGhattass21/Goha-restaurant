import type { Repository } from "typeorm"
import type { Product } from "../database/models/Product.model"
import type { CreateProductDto, UpdateProductDto } from "../../application/dtos/product.dto"
import type { IProductRepository } from "@domain/repositories/product.repository.interface"

export class ProductRepositoryImpl implements IProductRepository {
  constructor(private productRepository: Repository<Product>) { }

  async create(productData: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      ...productData,
      category: { category_id: productData.category_id } as any,
    })
    return await this.productRepository.save(product)
  }

  async findById(id: string): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { product_id: id },
      relations: ["category", "sizePrices", "sizePrices.size"],
    })
  }

  async findByNameAndCategory(name: string, categoryId: string): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: {
        name,
        category: { category_id: categoryId },
      },
    })
  }

  async findAll(page = 1, limit = 10): Promise<{ products: Product[]; total: number }> {
    const [products, total] = await this.productRepository.findAndCount({
      relations: ["category", "sizePrices", "sizePrices.size"],
      skip: (page - 1) * limit,
      take: limit,
      order: { name: "ASC" },
    })

    return { products, total }
  }

  async findByCategory(categoryId: string, page = 1, limit = 10): Promise<{ products: Product[]; total: number }> {
    const [products, total] = await this.productRepository.findAndCount({
      where: { category: { category_id: categoryId } },
      relations: ["category", "sizePrices", "sizePrices.size"],
      skip: (page - 1) * limit,
      take: limit,
      order: { name: "ASC" },
    })

    return { products, total }
  }

  async update(id: string, productData: UpdateProductDto): Promise<Product | null> {
    const updateData: any = { ...productData }
    if (productData.category_id) {
      updateData.category = { category_id: productData.category_id }
      delete updateData.category_id
    }

    await this.productRepository.update(id, updateData)
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
