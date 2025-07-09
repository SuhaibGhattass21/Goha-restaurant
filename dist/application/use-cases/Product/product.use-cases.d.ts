import type { IProductRepository } from "@domain/repositories/Product/product.repository.interface";
import type { ICategoryRepository } from "@domain/repositories/Category/category.repository.interface";
import type { CreateProductDto, ProductResponseDto, ProductListResponseDto, UpdateProductDto } from "@application/dtos/Product/product.dto";
export declare class ProductUseCases {
    private productRepository;
    private categoryRepository;
    constructor(productRepository: IProductRepository, categoryRepository: ICategoryRepository);
    createProduct(productData: CreateProductDto): Promise<ProductResponseDto>;
    getProductById(id: string): Promise<ProductResponseDto | null>;
    getAllProducts(page?: number, limit?: number): Promise<ProductListResponseDto>;
    getProductsByCategory(categoryId: string, page?: number, limit?: number): Promise<ProductListResponseDto>;
    updateProduct(id: string, productData: UpdateProductDto): Promise<ProductResponseDto | null>;
    deleteProduct(id: string): Promise<boolean>;
    private mapToResponseDto;
}
