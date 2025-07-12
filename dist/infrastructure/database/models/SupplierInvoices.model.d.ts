import { Supplier } from "./Supplier.model";
import { SupplierPayment } from "./SupplierPayments.model";
import { SupplierInvoicesStatus } from "../../../domain/enums/Supplier.enums";
export declare class SupplierInvoice {
    invoice_id: string;
    supplier: Supplier;
    total_amount: number;
    status: SupplierInvoicesStatus;
    created_at: Date;
    payments: SupplierPayment[];
}
