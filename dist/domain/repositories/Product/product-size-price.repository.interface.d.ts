import type { CreateProductSizePriceDto, UpdateProductSizePriceDto } from "@application/dtos/Product/product-size-price.dto";
import type { ProductSizePrice } from "@infrastructure/database/models";
export interface IProductSizePriceRepository {
    create(productSizePriceData: CreateProductSizePriceDto): Promise<ProductSizePrice>;
    findById(id: string): Promise<ProductSizePrice | null>;
    findByProductAndSize(productId: string, sizeId: string): Promise<ProductSizePrice | null>;
    findAll(page?: number, limit?: number): Promise<{
        productSizePrices: ProductSizePrice[];
        total: number;
    }>;
    findByProduct(productId: string, page?: number, limit?: number): Promise<{
        productSizePrices: ProductSizePrice[];
        total: number;
    }>;
    update(id: string, productSizePriceData: UpdateProductSizePriceDto): Promise<ProductSizePrice | null>;
    delete(id: string): Promise<boolean>;
}
