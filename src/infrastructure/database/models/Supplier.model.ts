import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { SupplierInvoice } from "./SupplierInvoices.model";

@Entity("suppliers")
export class Supplier {
    @PrimaryGeneratedColumn("uuid")
    supplier_id: string = uuidv4().toString();

    @Column({ type: "text" })
    name!: string;

    @Column({ type: "text", nullable: true })
    phone!: string;

    @Column({ type: "text", nullable: true })
    notes!: string;

    @OneToMany(() => SupplierInvoice, (invoice) => invoice.supplier)
    invoices!: SupplierInvoice[];
}
