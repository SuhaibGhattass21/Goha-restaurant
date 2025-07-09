import { SupplierInvoice } from "./SupplierInvoices.model";
import { User } from "./user.model";
export declare class SupplierPayment {
    payment_id: string;
    invoice: SupplierInvoice;
    amount: number;
    admin: User;
    paid_at: Date;
}
