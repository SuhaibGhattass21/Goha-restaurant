import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Supplier } from "./Supplier.model";
import { SupplierPayment } from "./SupplierPayments.model";
import { SupplierInvoicesStatus } from "../../../domain/enums/Supplier.enums"

@Entity("supplier_invoices")
export class SupplierInvoice {
    @PrimaryGeneratedColumn("uuid")
    invoice_id: string = uuidv4().toString();

    @ManyToOne(() => Supplier, (supplier) => supplier.invoices)
    @JoinColumn({ name: "supplier_id" })
    supplier!: Supplier;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_amount!: number;

    @Column({ type: "enum", enum: SupplierInvoicesStatus })
    status!: SupplierInvoicesStatus;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @OneToMany(() => SupplierPayment, (payment) => payment.invoice)
    payments!: SupplierPayment[];
}
