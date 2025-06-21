import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { StockTransaction } from "./StockTransaction.model";
import { StockItemType, StockItemStatus } from "../../../domain/enums/Stock.enums";

@Entity("stock_items")
export class StockItem {
    @PrimaryGeneratedColumn("uuid")
    stock_item_id: string = uuidv4().toString();

    @Column({ type: "text", unique: true })
    name!: string;

    @Column({ type: "enum", enum: StockItemType })
    type!: StockItemType;

    @Column({ type: "text" })
    unit!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    current_quantity!: number;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    minimum_value!: number;

    @Column({ type: "enum", enum: StockItemStatus })
    status!: StockItemStatus;

    @Column({ type: "date" })
    last_updated_at: Date = new Date();

    @OneToMany(() => StockTransaction, (st) => st.stockItem)
    transactions!: StockTransaction[];
}
