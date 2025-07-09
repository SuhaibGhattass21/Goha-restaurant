import { OrderResponseDto, CashierInfoDto, ShiftInfoDto } from "./order.dto";
export declare class CreateCancelledOrderDto {
    order_id: string;
    cancelled_by: string;
    shift_id: string;
    reason?: string;
}
export declare class CancelledOrderResponseDto {
    cancelled_order_id: string;
    order: OrderResponseDto;
    cancelled_by: CashierInfoDto;
    shift: ShiftInfoDto;
    reason?: string;
    cancelled_at: string;
}
export declare class CancelledOrderListResponseDto {
    cancelled_orders: CancelledOrderResponseDto[];
    total: number;
    page: number;
    limit: number;
}
