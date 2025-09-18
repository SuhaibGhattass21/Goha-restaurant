import type { CreateProductDto, UpdateProductDto } from "@application/dtos/Product/product.dto"
import { Product } from "../../../infrastructure/database/models/Product.model"

export interface IProductRepository {
  create(productData: CreateProductDto): Promise<Product>
  findById(id: string): Promise<Product | null>
  findByNameAndCategory(name: string, categoryId: string): Promise<Product | null>
  findAll(page?: number, limit?: number): Promise<{ products: Product[]; total: number }>
  findByCategory(categoryId: string, page?: number, limit?: number): Promise<{ products: Product[]; total: number }>
  update(id: string, productData: UpdateProductDto): Promise<Product | null>
  delete(id: string): Promise<boolean>
}
