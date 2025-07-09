export declare class CreateCategoryDto {
    name: string;
    description?: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    description?: string;
}
export declare class CategoryResponseDto {
    category_id: string;
    name: string;
    description?: string;
    products?: CategoryProductDto[];
    sizes?: CategorySizeDto[];
    extras?: CategoryExtraDto[];
}
export declare class CategoryListResponseDto {
    categories: CategoryResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class CategoryProductDto {
    product_id: string;
    name: string;
}
export declare class CategoryExtraDto {
    extra_id: string;
    name: string;
}
export declare class CategorySizeDto {
    size_id: string;
    size_name: string;
}
