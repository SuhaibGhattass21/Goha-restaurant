import { StockItem } from "./StockItem.model";
import { User } from "./user.model";
import { Shift } from "./Shift.model";
import { StockTransactionType } from "../../../domain/enums/Stock.enums";
export declare class StockTransaction {
    transaction_id: string;
    stockItem: StockItem;
    type: StockTransactionType;
    quantity: number;
    admin: User;
    shift: Shift;
    timestamp: Date;
}
