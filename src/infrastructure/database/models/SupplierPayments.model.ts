import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { SupplierInvoice } from "./SupplierInvoices.model";
import { User } from "./user.model";

@Entity("supplier_payments")
export class SupplierPayment {
    @PrimaryGeneratedColumn("uuid")
    payment_id: string = uuidv4().toString();

    @ManyToOne(() => SupplierInvoice, (invoice) => invoice.payments)
    @JoinColumn({ name: "invoice_id" })
    invoice!: SupplierInvoice;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    admin!: User;

    @CreateDateColumn({ type: "timestamptz" })
    paid_at: Date = new Date();
}
