export declare class CreateProductDto {
    name: string;
    description?: string;
    image_url?: string;
    is_active?: boolean;
    category_id: string;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    image_url?: string;
    is_active?: boolean;
    category_id?: string;
}
export declare class ProductResponseDto {
    product_id: string;
    name: string;
    description?: string;
    image_url?: string;
    is_active: boolean;
    category?: ProductCategoryDto;
    sizePrices?: ProductSizePriceDto[];
}
export declare class ProductListResponseDto {
    products: ProductResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class ProductCategoryDto {
    category_id: string;
    name: string;
}
export declare class ProductSizePriceDto {
    product_size_id: string;
    price: number;
    size?: ProductSizeDto;
}
export declare class ProductSizeDto {
    size_id: string;
    size_name: string;
}
