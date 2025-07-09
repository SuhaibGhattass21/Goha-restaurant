export declare class CreateProductSizePriceDto {
    price: number;
    product_id: string;
    size_id: string;
}
export declare class UpdateProductSizePriceDto {
    price?: number;
    product_id?: string;
    size_id?: string;
}
export declare class ProductSizePriceResponseDto {
    product_size_id: string;
    price: number;
    product?: ProductSizePriceProductDto;
    size?: ProductSizePriceSizeDto;
}
export declare class ProductSizePriceListResponseDto {
    productSizePrices: ProductSizePriceResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class ProductSizePriceProductDto {
    product_id: string;
    name: string;
}
export declare class ProductSizePriceSizeDto {
    size_id: string;
    size_name: string;
}
