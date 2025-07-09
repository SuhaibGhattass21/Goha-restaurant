export declare class CreateOrderItemDto {
    order_id: string;
    product_size_id: string;
    quantity: number;
    unit_price: number;
    special_instructions?: string;
    extras?: CreateOrderItemExtraDto[];
}
export declare class UpdateOrderItemDto {
    product_size_id?: string;
    quantity?: number;
    unit_price?: number;
    special_instructions?: string;
}
export declare class ProductSizeInfoDto {
    product_size_id: string;
    product_name: string;
    size_name: string;
    price: number;
    category_name: string;
    product_description?: string;
    category_description?: string;
}
export declare class OrderItemResponseDto {
    order_item_id: string;
    order_id: string;
    product_size?: ProductSizeInfoDto;
    quantity: number;
    category_id: string;
    category_name: string;
    unit_price: number;
    special_instructions?: string;
    extras?: OrderItemExtraResponseDto[];
    total_price: number;
}
export declare class OrderItemListResponseDto {
    order_items: OrderItemResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class CreateOrderItemExtraDto {
    extra_id: string;
    price: number;
}
export declare class CategoryExtraInfoDto {
    extra_id: string;
    name: string;
    price: number;
    category_name: string;
}
export declare class OrderItemExtraResponseDto {
    order_item_extra_id: string;
    order_item_id: string;
    extra?: CategoryExtraInfoDto;
    price: number;
}
