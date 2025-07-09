import type { Repository } from "typeorm";
import type { ProductSizePrice } from "../../database/models/ProductSizePrice.model";
import type { CreateProductSizePriceDto, UpdateProductSizePriceDto } from "../../../application/dtos/Product/product-size-price.dto";
import type { IProductSizePriceRepository } from "../../../domain/repositories/Product/product-size-price.repository.interface";
export declare class ProductSizePriceRepositoryImpl implements IProductSizePriceRepository {
    private productSizePriceRepository;
    constructor(productSizePriceRepository: Repository<ProductSizePrice>);
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
