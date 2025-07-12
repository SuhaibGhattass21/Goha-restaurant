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
exports.ShiftTransactionSummaryDto = exports.StockTransactionStatsDto = exports.StockTransactionListResponseDto = exports.StockTransactionResponseDto = exports.UpdateStockTransactionDto = exports.CreateStockTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Stock_enums_1 = require("../../../domain/enums/Stock.enums");
class CreateStockTransactionDto {
}
exports.CreateStockTransactionDto = CreateStockTransactionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStockTransactionDto.prototype, "stock_item_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockTransactionType),
    __metadata("design:type", String)
], CreateStockTransactionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateStockTransactionDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStockTransactionDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateStockTransactionDto.prototype, "shift_id", void 0);
class UpdateStockTransactionDto {
}
exports.UpdateStockTransactionDto = UpdateStockTransactionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateStockTransactionDto.prototype, "stock_item_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockTransactionType),
    __metadata("design:type", String)
], UpdateStockTransactionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateStockTransactionDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateStockTransactionDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateStockTransactionDto.prototype, "shift_id", void 0);
class StockTransactionResponseDto {
}
exports.StockTransactionResponseDto = StockTransactionResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockTransactionResponseDto.prototype, "transaction_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockTransactionResponseDto.prototype, "stock_item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockTransactionResponseDto.prototype, "stock_item_name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockTransactionType),
    __metadata("design:type", String)
], StockTransactionResponseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], StockTransactionResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockTransactionResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockTransactionResponseDto.prototype, "user_name", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockTransactionResponseDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], StockTransactionResponseDto.prototype, "timestamp", void 0);
class StockTransactionListResponseDto {
}
exports.StockTransactionListResponseDto = StockTransactionListResponseDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StockTransactionResponseDto),
    __metadata("design:type", Array)
], StockTransactionListResponseDto.prototype, "transactions", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], StockTransactionListResponseDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], StockTransactionListResponseDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], StockTransactionListResponseDto.prototype, "limit", void 0);
class StockTransactionStatsDto {
}
exports.StockTransactionStatsDto = StockTransactionStatsDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockTransactionStatsDto.prototype, "stock_item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockTransactionStatsDto.prototype, "stock_item_name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], StockTransactionStatsDto.prototype, "total_in", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], StockTransactionStatsDto.prototype, "total_out", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], StockTransactionStatsDto.prototype, "net_change", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], StockTransactionStatsDto.prototype, "transaction_count", void 0);
class ShiftTransactionSummaryDto {
}
exports.ShiftTransactionSummaryDto = ShiftTransactionSummaryDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ShiftTransactionSummaryDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ShiftTransactionSummaryDto.prototype, "total_transactions", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], ShiftTransactionSummaryDto.prototype, "total_in_quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], ShiftTransactionSummaryDto.prototype, "total_out_quantity", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StockTransactionResponseDto),
    __metadata("design:type", Array)
], ShiftTransactionSummaryDto.prototype, "transactions", void 0);
//# sourceMappingURL=stock-transaction.dto.js.map