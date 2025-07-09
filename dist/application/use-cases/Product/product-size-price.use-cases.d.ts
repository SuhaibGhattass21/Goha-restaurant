import type { IProductSizePriceRepository } from "@domain/repositories/Product/product-size-price.repository.interface";
import type { IProductRepository } from "@domain/repositories/Product/product.repository.interface";
import type { ICategorySizeRepository } from "@domain/repositories/Category/category-size.repository.interface";
import type { CreateProductSizePriceDto, ProductSizePriceResponseDto, ProductSizePriceListResponseDto, UpdateProductSizePriceDto } from "@application/dtos/Product/product-size-price.dto";
export declare class ProductSizePriceUseCases {
    private productSizePriceRepository;
    private productRepository;
    private categorySizeRepository;
    constructor(productSizePriceRepository: IProductSizePriceRepository, productRepository: IProductRepository, categorySizeRepository: ICategorySizeRepository);
    createProductSizePrice(productSizePriceData: CreateProductSizePriceDto): Promise<ProductSizePriceResponseDto>;
    getProductSizePriceById(id: string): Promise<ProductSizePriceResponseDto | null>;
    getAllProductSizePrices(page?: number, limit?: number): Promise<ProductSizePriceListResponseDto>;
    getProductSizePricesByProduct(productId: string, page?: number, limit?: number): Promise<ProductSizePriceListResponseDto>;
    updateProductSizePrice(id: string, productSizePriceData: UpdateProductSizePriceDto): Promise<ProductSizePriceResponseDto | null>;
    deleteProductSizePrice(id: string): Promise<boolean>;
    private mapToResponseDto;
}
