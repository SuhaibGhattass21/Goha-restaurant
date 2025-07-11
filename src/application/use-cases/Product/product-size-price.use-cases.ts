import type { IProductSizePriceRepository } from "@domain/repositories/Product/product-size-price.repository.interface"
import type { IProductRepository } from "@domain/repositories/Product/product.repository.interface"
import type { ICategorySizeRepository } from "@domain/repositories/Category/category-size.repository.interface"
import type { ProductSizePrice } from "../../../infrastructure/database/models/ProductSizePrice.model"
import type {
  CreateProductSizePriceDto,
  ProductSizePriceResponseDto,
  ProductSizePriceListResponseDto,
  UpdateProductSizePriceDto,
} from "@application/dtos/Product/product-size-price.dto"

export class ProductSizePriceUseCases {
  constructor(
    private productSizePriceRepository: IProductSizePriceRepository,
    private productRepository: IProductRepository,
    private categorySizeRepository: ICategorySizeRepository,
  ) { }

  async createProductSizePrice(productSizePriceData: CreateProductSizePriceDto): Promise<ProductSizePriceResponseDto> {
    // Check if product exists
    const productPromise = this.productRepository.findById(productSizePriceData.product_id)
    // Check if size exists
    const sizePromise = this.categorySizeRepository.findById(productSizePriceData.size_id)
    // Check if this product-size combination already exists
    const existingProductSizePricePromise = this.productSizePriceRepository.findByProductAndSize(
      productSizePriceData.product_id,
      productSizePriceData.size_id,
    )


    const [isProductExists, isSizeExists, isExistingProductSizePrice] = await Promise.all([
      productPromise,
      sizePromise,
      existingProductSizePricePromise
    ]);

    if (!isProductExists) {
      throw new Error("Product not found")
    }

    if (!isSizeExists) {
      throw new Error("Category size not found")
    }
    if (isExistingProductSizePrice) {
      throw new Error("Price for this product and size combination already exists")
    }

    const productSizePrice = await this.productSizePriceRepository.create(productSizePriceData)
    return this.mapToResponseDto(productSizePrice)
  }

  async getProductSizePriceById(id: string): Promise<ProductSizePriceResponseDto | null> {
    const productSizePrice = await this.productSizePriceRepository.findById(id)
    return productSizePrice ? this.mapToResponseDto(productSizePrice) : null
  }

  async getAllProductSizePrices(page = 1, limit = 10): Promise<ProductSizePriceListResponseDto> {
    const { productSizePrices, total } = await this.productSizePriceRepository.findAll(page, limit)

    return {
      productSizePrices: productSizePrices.map((psp: any) => this.mapToResponseDto(psp)),
      total,
      page,
      limit,
    }
  }

  async getProductSizePricesByProduct(
    productId: string,
    page = 1,
    limit = 10,
  ): Promise<ProductSizePriceListResponseDto> {
    // Check if product exists
    const product = await this.productRepository.findById(productId)
    if (!product) {
      throw new Error("Product not found")
    }

    const { productSizePrices, total } = await this.productSizePriceRepository.findByProduct(productId, page, limit)

    return {
      productSizePrices: productSizePrices.map((psp: any) => this.mapToResponseDto(psp)),
      total,
      page,
      limit,
    }
  }

  async updateProductSizePrice(
    id: string,
    productSizePriceData: UpdateProductSizePriceDto,
  ): Promise<ProductSizePriceResponseDto | null> {
    // Check if product size price exists
    const existingProductSizePrice = await this.productSizePriceRepository.findById(id)
    if (!existingProductSizePrice) {
      return null
    }

    // If product is being updated, check if it exists
    if (productSizePriceData.product_id) {
      const product = await this.productRepository.findById(productSizePriceData.product_id)
      if (!product) {
        throw new Error("Product not found")
      }
    }

    // If size is being updated, check if it exists
    if (productSizePriceData.size_id) {
      const size = await this.categorySizeRepository.findById(productSizePriceData.size_id)
      if (!size) {
        throw new Error("Category size not found")
      }
    }

    // If product or size is being updated, check for duplicates
    if (productSizePriceData.product_id || productSizePriceData.size_id) {
      const productId = productSizePriceData.product_id || existingProductSizePrice.product.product_id
      const sizeId = productSizePriceData.size_id || existingProductSizePrice.size.size_id

      const duplicateProductSizePrice = await this.productSizePriceRepository.findByProductAndSize(productId, sizeId)
      if (duplicateProductSizePrice && duplicateProductSizePrice.product_size_id !== id) {
        throw new Error("Price for this product and size combination already exists")
      }
    }

    const productSizePrice = await this.productSizePriceRepository.update(id, productSizePriceData)
    return productSizePrice ? this.mapToResponseDto(productSizePrice) : null
  }

  async deleteProductSizePrice(id: string): Promise<boolean> {
    const productSizePrice = await this.productSizePriceRepository.findById(id)
    if (!productSizePrice) {
      return false
    }

    return await this.productSizePriceRepository.delete(id)
  }

  private mapToResponseDto(productSizePrice: ProductSizePrice): ProductSizePriceResponseDto {
    return {
      product_size_id: productSizePrice.product_size_id,
      price: productSizePrice.price,
      product: productSizePrice.product
        ? {
          product_id: productSizePrice.product.product_id,
          name: productSizePrice.product.name,
        }
        : undefined,
      size: productSizePrice.size
        ? {
          size_id: productSizePrice.size.size_id,
          size_name: productSizePrice.size.size_name,
        }
        : undefined,
    }
  }
}
