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
exports.CancelledOrderListResponseDto = exports.CancelledOrderResponseDto = exports.CreateCancelledOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const order_dto_1 = require("./order.dto"); // Reusing existing DTOs
class CreateCancelledOrderDto {
}
exports.CreateCancelledOrderDto = CreateCancelledOrderDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCancelledOrderDto.prototype, "order_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCancelledOrderDto.prototype, "cancelled_by", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCancelledOrderDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCancelledOrderDto.prototype, "reason", void 0);
class CancelledOrderResponseDto {
}
exports.CancelledOrderResponseDto = CancelledOrderResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CancelledOrderResponseDto.prototype, "cancelled_order_id", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => order_dto_1.OrderResponseDto),
    __metadata("design:type", order_dto_1.OrderResponseDto)
], CancelledOrderResponseDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => order_dto_1.CashierInfoDto),
    __metadata("design:type", order_dto_1.CashierInfoDto)
], CancelledOrderResponseDto.prototype, "cancelled_by", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => order_dto_1.ShiftInfoDto),
    __metadata("design:type", order_dto_1.ShiftInfoDto)
], CancelledOrderResponseDto.prototype, "shift", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CancelledOrderResponseDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CancelledOrderResponseDto.prototype, "cancelled_at", void 0);
class CancelledOrderListResponseDto {
}
exports.CancelledOrderListResponseDto = CancelledOrderListResponseDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CancelledOrderResponseDto),
    __metadata("design:type", Array)
], CancelledOrderListResponseDto.prototype, "cancelled_orders", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CancelledOrderListResponseDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CancelledOrderListResponseDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CancelledOrderListResponseDto.prototype, "limit", void 0);
//# sourceMappingURL=cancelled-order.dto.js.map