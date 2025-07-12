export declare class CreateCategorySizeDto {
    size_name: string;
    category_id: string;
}
export declare class UpdateCategorySizeDto {
    size_name?: string;
    category_id?: string;
}
export declare class CategorySizeResponseDto {
    size_id: string;
    size_name: string;
    category?: CategorySizeCategoryDto;
}
export declare class CategorySizeListResponseDto {
    sizes: CategorySizeResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class CategorySizeCategoryDto {
    category_id: string;
    name: string;
}
