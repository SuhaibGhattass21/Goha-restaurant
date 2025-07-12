import { OrderStatus, OrderType } from "../../../domain/enums/Order.enums";
import { CreateOrderItemDto, OrderItemResponseDto } from "./order-item.dto";
import { ShiftType } from "../../../domain/enums/Shift.enums";
export declare class CreateOrderDto {
    cashier_id: string;
    shift_id: string;
    table_number?: string;
    order_type: OrderType;
    customer_name?: string;
    customer_phone?: string;
    items: CreateOrderItemDto[];
}
export declare class UpdateOrderDto {
    table_number?: string;
    order_type?: OrderType;
    status?: OrderStatus;
    customer_name?: string;
    customer_phone?: string;
}
export declare class CashierInfoDto {
    id: string;
    username: string;
    fullName: string;
}
export declare class ShiftInfoDto {
    shift_id: string;
    shift_type: string;
    start_time: string;
    status: string;
}
export declare class OrderResponseDto {
    order_id: string;
    cashier?: CashierInfoDto;
    shift?: ShiftInfoDto;
    table_number?: string;
    order_type: OrderType;
    status: OrderStatus;
    total_price: number;
    customer_name?: string;
    customer_phone?: string;
    created_at: string;
    items: OrderItemResponseDto[];
    items_count: number;
}
export declare class OrderListResponseDto {
    orders: OrderResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class OrderSummaryDto {
    order_id: string;
    table_number?: string;
    order_type: OrderType;
    status: OrderStatus;
    total_price: number;
    customer_name?: string;
    created_at: string;
    items_count: number;
}
export declare class OrderStatsDto {
    total_orders: number;
    active_orders: number;
    completed_orders: number;
    cancelled_orders: number;
    total_revenue: number;
    average_order_value: number;
}
export declare class FilterOrdersByShiftTypeAndDateDto {
    shift_type: ShiftType;
    date: string;
}
