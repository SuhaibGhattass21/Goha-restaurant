import { StockTransactionType } from "../../../domain/enums/Stock.enums";
export declare class CreateStockTransactionDto {
    stock_item_id: string;
    type: StockTransactionType;
    quantity: number;
    user_id: string;
    shift_id: string;
}
export declare class UpdateStockTransactionDto {
    stock_item_id?: string;
    type?: StockTransactionType;
    quantity?: number;
    user_id?: string;
    shift_id?: string;
}
export declare class StockTransactionResponseDto {
    transaction_id: string;
    stock_item_id: string;
    stock_item_name: string;
    type: StockTransactionType;
    quantity: number;
    user_id: string;
    user_name: string;
    shift_id: string;
    timestamp: Date;
}
export declare class StockTransactionListResponseDto {
    transactions: StockTransactionResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class StockTransactionStatsDto {
    stock_item_id: string;
    stock_item_name: string;
    total_in: number;
    total_out: number;
    net_change: number;
    transaction_count: number;
}
export declare class ShiftTransactionSummaryDto {
    shift_id: string;
    total_transactions: number;
    total_in_quantity: number;
    total_out_quantity: number;
    transactions: StockTransactionResponseDto[];
}
