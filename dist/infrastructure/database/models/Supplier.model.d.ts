import { SupplierInvoice } from "./SupplierInvoices.model";
export declare class Supplier {
    supplier_id: string;
    name: string;
    phone: string;
    notes: string;
    invoices: SupplierInvoice[];
}
