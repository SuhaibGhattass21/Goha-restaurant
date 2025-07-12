import { OrderPaymentMethod } from "../../../domain/enums/Order.enums";
export declare class CreateExternalReceiptDto {
    order_id: string;
    shift_id: string;
    cashier_id: string;
    total_amount: number;
    payment_method: OrderPaymentMethod;
    image_url?: string;
    is_printed?: boolean;
    notes?: string;
}
export declare class ExternalReceiptResponseDto {
    receipt_id: string;
    order_id: string;
    shift_id: string;
    cashier_id: string;
    total_amount: number;
    payment_method: OrderPaymentMethod;
    image_url?: string;
    is_printed: boolean;
    notes?: string;
    created_at: string;
}
