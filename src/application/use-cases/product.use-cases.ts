import type { IProductRepository } from "@domain/repositories/product.repository.interface"
import type { ICategoryRepository } from "@domain/repositories/category.repository.interface"
import type { Product } from "../../infrastructure/database/models/Product.model"
import type {
  CreateProductDto,
  ProductResponseDto,
  ProductListResponseDto,
  UpdateProductDto,
} from "@application/dtos/product.dto"

export class ProductUseCases {
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository,
  ) { }

  async createProduct(productData: CreateProductDto): Promise<ProductResponseDto> {
    // Check if category exists
    const categoryPromise = this.categoryRepository.findById(productData.category_id)
    // Check if product with same name already exists in this category
    const existingProductPromise = this.productRepository.findByNameAndCategory(
      productData.name,
      productData.category_id,
    )

    const [isCategoryExists, isProductExists] = await Promise.all([categoryPromise, existingProductPromise])

    if (!isCategoryExists) {
      throw new Error("Category not found")
    }

    if (isProductExists) {
      throw new Error("Product with this name already exists in this category")
    }

    const product = await this.productRepository.create(productData)
    return this.mapToResponseDto(product)
  }

  async getProductById(id: string): Promise<ProductResponseDto | null> {
    const product = await this.productRepository.findById(id)
    return product ? this.mapToResponseDto(product) : null
  }

  async getAllProducts(page = 1, limit = 10): Promise<ProductListResponseDto> {
    const { products, total } = await this.productRepository.findAll(page, limit)

    return {
      products: products.map((product: any) => this.mapToResponseDto(product)),
      total,
      page,
      limit,
    }
  }

  async getProductsByCategory(categoryId: string, page = 1, limit = 10): Promise<ProductListResponseDto> {
    // Check if category exists
    const category = await this.categoryRepository.findById(categoryId)
    if (!category) {
      throw new Error("Category not found")
    }

    const { products, total } = await this.productRepository.findByCategory(categoryId, page, limit)

    return {
      products: products.map((product: any) => this.mapToResponseDto(product)),
      total,
      page,
      limit,
    }
  }

  async updateProduct(id: string, productData: UpdateProductDto): Promise<ProductResponseDto | null> {
    // Check if product exists
    const existingProduct = await this.productRepository.findById(id)
    if (!existingProduct) {
      return null
    }

    // If category is being updated, check if it exists
    if (productData.category_id) {
      const category = await this.categoryRepository.findById(productData.category_id)
      if (!category) {
        throw new Error("Category not found")
      }
    }

    // If name is being updated, check for duplicates in the category
    if (productData.name) {
      const categoryId = productData.category_id || existingProduct.category.category_id
      const duplicateProduct = await this.productRepository.findByNameAndCategory(productData.name, categoryId)
      if (duplicateProduct && duplicateProduct.product_id !== id) {
        throw new Error("Product with this name already exists in this category")
      }
    }

    const product = await this.productRepository.update(id, productData)
    return product ? this.mapToResponseDto(product) : null
  }

  async deleteProduct(id: string): Promise<boolean> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      return false
    }

    return await this.productRepository.delete(id)
  }

  private mapToResponseDto(product: Product): ProductResponseDto {
    return {
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      is_active: product.is_active,
      category: product.category
        ? {
          category_id: product.category.category_id,
          name: product.category.name,
        }
        : undefined,
      sizePrices:
        product.sizePrices?.map((sp) => ({
          product_size_id: sp.product_size_id,
          price: sp.price,
          size: sp.size
            ? {
              size_id: sp.size.size_id,
              size_name: sp.size.size_name,
            }
            : undefined,
        })) || [],
    }
  }
}
