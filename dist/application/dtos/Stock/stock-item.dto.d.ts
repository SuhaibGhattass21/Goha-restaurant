import { StockItemType, StockItemStatus, StockTransactionType } from "../../../domain/enums/Stock.enums";
export declare class CreateStockItemDto {
    name: string;
    type: StockItemType;
    unit: string;
    current_quantity: number;
    minimum_value: number;
    status: StockItemStatus;
}
export declare class UpdateStockItemDto {
    name?: string;
    type?: StockItemType;
    unit?: string;
    current_quantity?: number;
    minimum_value?: number;
    status?: StockItemStatus;
}
export declare class StockItemResponseDto {
    stock_item_id: string;
    name: string;
    type: StockItemType;
    unit: string;
    current_quantity: number;
    minimum_value: number;
    status: StockItemStatus;
    last_updated_at: Date;
    transactions?: StockTransactionDto[];
}
export declare class StockItemListResponseDto {
    stockItems: StockItemResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class StockTransactionDto {
    transaction_id: string;
    type: StockTransactionType;
    quantity: number;
    timestamp: Date;
}
export declare class LowStockItemDto {
    stock_item_id: string;
    name: string;
    current_quantity: number;
    minimum_value: number;
    unit: string;
}
