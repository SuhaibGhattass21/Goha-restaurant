import { StockTransaction } from "./StockTransaction.model";
import { StockItemType, StockItemStatus } from "../../../domain/enums/Stock.enums";
export declare class StockItem {
    stock_item_id: string;
    name: string;
    type: StockItemType;
    unit: string;
    current_quantity: number;
    minimum_value: number;
    status: StockItemStatus;
    last_updated_at: Date;
    transactions: StockTransaction[];
}
