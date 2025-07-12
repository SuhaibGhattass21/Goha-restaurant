"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOrdersByShiftTypeAndDateDto = exports.OrderStatsDto = exports.OrderSummaryDto = exports.OrderListResponseDto = exports.OrderResponseDto = exports.ShiftInfoDto = exports.CashierInfoDto = exports.UpdateOrderDto = exports.CreateOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Order_enums_1 = require("../../../domain/enums/Order.enums");
const order_item_dto_1 = require("./order-item.dto");
const Shift_enums_1 = require("../../../domain/enums/Shift.enums");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "cashier_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "table_number", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderType),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "order_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customer_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customer_phone", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => order_item_dto_1.CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
class UpdateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "table_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderType),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "order_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderStatus),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "customer_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "customer_phone", void 0);
class CashierInfoDto {
}
exports.CashierInfoDto = CashierInfoDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CashierInfoDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CashierInfoDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CashierInfoDto.prototype, "fullName", void 0);
class ShiftInfoDto {
}
exports.ShiftInfoDto = ShiftInfoDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ShiftInfoDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderType),
    __metadata("design:type", String)
], ShiftInfoDto.prototype, "shift_type", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ShiftInfoDto.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShiftInfoDto.prototype, "status", void 0);
class OrderResponseDto {
}
exports.OrderResponseDto = OrderResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "order_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CashierInfoDto),
    __metadata("design:type", CashierInfoDto)
], OrderResponseDto.prototype, "cashier", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShiftInfoDto),
    __metadata("design:type", ShiftInfoDto)
], OrderResponseDto.prototype, "shift", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "table_number", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderType),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "order_type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderStatus),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "total_price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customer_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customer_phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => order_item_dto_1.OrderItemResponseDto),
    __metadata("design:type", Array)
], OrderResponseDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "items_count", void 0);
class OrderListResponseDto {
}
exports.OrderListResponseDto = OrderListResponseDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderResponseDto),
    __metadata("design:type", Array)
], OrderListResponseDto.prototype, "orders", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderListResponseDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrderListResponseDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrderListResponseDto.prototype, "limit", void 0);
class OrderSummaryDto {
}
exports.OrderSummaryDto = OrderSummaryDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "order_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "table_number", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderType),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "order_type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderStatus),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], OrderSummaryDto.prototype, "total_price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "customer_name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OrderSummaryDto.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], OrderSummaryDto.prototype, "items_count", void 0);
// Order Statistics DTOs
class OrderStatsDto {
}
exports.OrderStatsDto = OrderStatsDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderStatsDto.prototype, "total_orders", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderStatsDto.prototype, "active_orders", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderStatsDto.prototype, "completed_orders", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OrderStatsDto.prototype, "cancelled_orders", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], OrderStatsDto.prototype, "total_revenue", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], OrderStatsDto.prototype, "average_order_value", void 0);
class FilterOrdersByShiftTypeAndDateDto {
}
exports.FilterOrdersByShiftTypeAndDateDto = FilterOrdersByShiftTypeAndDateDto;
__decorate([
    (0, class_validator_1.IsEnum)(Shift_enums_1.ShiftType),
    __metadata("design:type", String)
], FilterOrdersByShiftTypeAndDateDto.prototype, "shift_type", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FilterOrdersByShiftTypeAndDateDto.prototype, "date", void 0);
//# sourceMappingURL=order.dto.js.map