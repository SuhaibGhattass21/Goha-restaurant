import type { Repository } from "typeorm"
import type { ProductSizePrice } from "../../database/models/ProductSizePrice.model"
import type {
  CreateProductSizePriceDto,
  UpdateProductSizePriceDto,
} from "../../../application/dtos/Product/product-size-price.dto"
import type { IProductSizePriceRepository } from "@domain/repositories/Product/product-size-price.repository.interface"

export class ProductSizePriceRepositoryImpl implements IProductSizePriceRepository {
  constructor(private productSizePriceRepository: Repository<ProductSizePrice>) { }

  async create(productSizePriceData: CreateProductSizePriceDto): Promise<ProductSizePrice> {
    const productSizePrice = this.productSizePriceRepository.create({
      ...productSizePriceData,
      product: { product_id: productSizePriceData.product_id } as any,
      size: { size_id: productSizePriceData.size_id } as any,
    })
    return await this.productSizePriceRepository.save(productSizePrice)
  }

  async findById(id: string): Promise<ProductSizePrice | null> {
    return await this.productSizePriceRepository.findOne({
      where: { product_size_id: id },
      relations: ["product", "size"],
    })
  }

  async findByProductAndSize(productId: string, sizeId: string): Promise<ProductSizePrice | null> {
    return await this.productSizePriceRepository.findOne({
      where: {
        product: { product_id: productId },
        size: { size_id: sizeId },
      },
    })
  }

  async findAll(page = 1, limit = 10): Promise<{ productSizePrices: ProductSizePrice[]; total: number }> {
    const [productSizePrices, total] = await this.productSizePriceRepository.findAndCount({
      relations: ["product", "size"],
      skip: (page - 1) * limit,
      take: limit,
      order: { price: "ASC" },
    })

    return { productSizePrices, total }
  }

  async findByProduct(
    productId: string,
    page = 1,
    limit = 10,
  ): Promise<{ productSizePrices: ProductSizePrice[]; total: number }> {
    const [productSizePrices, total] = await this.productSizePriceRepository.findAndCount({
      where: { product: { product_id: productId } },
      relations: ["product", "size"],
      skip: (page - 1) * limit,
      take: limit,
      order: { price: "ASC" },
    })

    return { productSizePrices, total }
  }

  async update(id: string, productSizePriceData: UpdateProductSizePriceDto): Promise<ProductSizePrice | null> {
    const updateData: any = { ...productSizePriceData }
    if (productSizePriceData.product_id) {
      updateData.product = { product_id: productSizePriceData.product_id }
      delete updateData.product_id
    }
    if (productSizePriceData.size_id) {
      updateData.size = { size_id: productSizePriceData.size_id }
      delete updateData.size_id
    }

    await this.productSizePriceRepository.update(id, updateData)
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productSizePriceRepository.delete(id)
    return (result.affected ?? 0) > 0
  }
}
