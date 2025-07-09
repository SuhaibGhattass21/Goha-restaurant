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
exports.LowStockItemDto = exports.StockTransactionDto = exports.StockItemListResponseDto = exports.StockItemResponseDto = exports.UpdateStockItemDto = exports.CreateStockItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Stock_enums_1 = require("../../../domain/enums/Stock.enums");
class CreateStockItemDto {
}
exports.CreateStockItemDto = CreateStockItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockItemType),
    __metadata("design:type", String)
], CreateStockItemDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockItemDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateStockItemDto.prototype, "current_quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateStockItemDto.prototype, "minimum_value", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockItemStatus),
    __metadata("design:type", String)
], CreateStockItemDto.prototype, "status", void 0);
class UpdateStockItemDto {
}
exports.UpdateStockItemDto = UpdateStockItemDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStockItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockItemType),
    __metadata("design:type", String)
], UpdateStockItemDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStockItemDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateStockItemDto.prototype, "current_quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateStockItemDto.prototype, "minimum_value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockItemStatus),
    __metadata("design:type", String)
], UpdateStockItemDto.prototype, "status", void 0);
class StockItemResponseDto {
}
exports.StockItemResponseDto = StockItemResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockItemResponseDto.prototype, "stock_item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockItemResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockItemType),
    __metadata("design:type", String)
], StockItemResponseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockItemResponseDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], StockItemResponseDto.prototype, "current_quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], StockItemResponseDto.prototype, "minimum_value", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockItemStatus),
    __metadata("design:type", String)
], StockItemResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], StockItemResponseDto.prototype, "last_updated_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StockTransactionDto),
    __metadata("design:type", Array)
], StockItemResponseDto.prototype, "transactions", void 0);
class StockItemListResponseDto {
}
exports.StockItemListResponseDto = StockItemListResponseDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StockItemResponseDto),
    __metadata("design:type", Array)
], StockItemListResponseDto.prototype, "stockItems", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], StockItemListResponseDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], StockItemListResponseDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], StockItemListResponseDto.prototype, "limit", void 0);
class StockTransactionDto {
}
exports.StockTransactionDto = StockTransactionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockTransactionDto.prototype, "transaction_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Stock_enums_1.StockTransactionType),
    __metadata("design:type", String)
], StockTransactionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], StockTransactionDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], StockTransactionDto.prototype, "timestamp", void 0);
class LowStockItemDto {
}
exports.LowStockItemDto = LowStockItemDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LowStockItemDto.prototype, "stock_item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LowStockItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], LowStockItemDto.prototype, "current_quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], LowStockItemDto.prototype, "minimum_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LowStockItemDto.prototype, "unit", void 0);
//# sourceMappingURL=stock-item.dto.js.map