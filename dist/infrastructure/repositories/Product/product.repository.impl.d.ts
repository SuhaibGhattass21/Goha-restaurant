import type { Repository } from "typeorm";
import type { Product } from "../../database/models/Product.model";
import type { CreateProductDto, UpdateProductDto } from "../../../application/dtos/Product/product.dto";
import type { IProductRepository } from "../../../domain/repositories/Product/product.repository.interface";
export declare class ProductRepositoryImpl implements IProductRepository {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    create(productData: CreateProductDto): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findByNameAndCategory(name: string, categoryId: string): Promise<Product | null>;
    findAll(page?: number, limit?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    findByCategory(categoryId: string, page?: number, limit?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    update(id: string, productData: UpdateProductDto): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
}
