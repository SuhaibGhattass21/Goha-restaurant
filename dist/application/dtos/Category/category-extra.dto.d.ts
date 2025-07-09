export declare class CreateCategoryExtraDto {
    name: string;
    price: number;
    category_id: string;
}
export declare class UpdateCategoryExtraDto {
    name?: string;
    price?: number;
    category_id?: string;
}
export declare class CategoryExtraResponseDto {
    extra_id: string;
    name: string;
    price: number;
    category?: CategoryExtraCategoryDto;
}
export declare class CategoryExtraListResponseDto {
    extras: CategoryExtraResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class CategoryExtraCategoryDto {
    category_id: string;
    name: string;
}
