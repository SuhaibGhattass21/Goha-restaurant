import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { StockItem } from "./StockItem.model";
import { User } from "./user.model";
import { Shift } from "./Shift.model";
import { StockTransactionType } from "../../../domain/enums/Stock.enums"

@Entity("stock_transactions")
export class StockTransaction {
    @PrimaryGeneratedColumn("uuid")
    transaction_id: string = uuidv4().toString();

    @ManyToOne(() => StockItem, (item) => item.transactions)
    @JoinColumn({ name: "stock_item_id" })
    stockItem!: StockItem;

    @Column({ type: "enum", enum: StockTransactionType })
    type!: StockTransactionType;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    quantity!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    admin!: User;

    @ManyToOne(() => Shift)
    @JoinColumn({ name: "shift_id" })
    shift!: Shift;

    @CreateDateColumn({ type: "timestamptz" })
    timestamp!: Date;
}
