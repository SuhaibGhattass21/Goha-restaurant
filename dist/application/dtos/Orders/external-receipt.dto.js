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
exports.ExternalReceiptResponseDto = exports.CreateExternalReceiptDto = void 0;
const class_validator_1 = require("class-validator");
const Order_enums_1 = require("../../../domain/enums/Order.enums");
class CreateExternalReceiptDto {
}
exports.CreateExternalReceiptDto = CreateExternalReceiptDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateExternalReceiptDto.prototype, "order_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateExternalReceiptDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateExternalReceiptDto.prototype, "cashier_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateExternalReceiptDto.prototype, "total_amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderPaymentMethod),
    __metadata("design:type", String)
], CreateExternalReceiptDto.prototype, "payment_method", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExternalReceiptDto.prototype, "image_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateExternalReceiptDto.prototype, "is_printed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExternalReceiptDto.prototype, "notes", void 0);
class ExternalReceiptResponseDto {
}
exports.ExternalReceiptResponseDto = ExternalReceiptResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "receipt_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "order_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "cashier_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExternalReceiptResponseDto.prototype, "total_amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_enums_1.OrderPaymentMethod),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "payment_method", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "image_url", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ExternalReceiptResponseDto.prototype, "is_printed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ExternalReceiptResponseDto.prototype, "created_at", void 0);
//# sourceMappingURL=external-receipt.dto.js.map