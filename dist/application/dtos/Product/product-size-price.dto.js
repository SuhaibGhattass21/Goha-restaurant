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
exports.ProductSizePriceSizeDto = exports.ProductSizePriceProductDto = exports.ProductSizePriceListResponseDto = exports.ProductSizePriceResponseDto = exports.UpdateProductSizePriceDto = exports.CreateProductSizePriceDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateProductSizePriceDto {
}
exports.CreateProductSizePriceDto = CreateProductSizePriceDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductSizePriceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProductSizePriceDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProductSizePriceDto.prototype, "size_id", void 0);
class UpdateProductSizePriceDto {
}
exports.UpdateProductSizePriceDto = UpdateProductSizePriceDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductSizePriceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateProductSizePriceDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateProductSizePriceDto.prototype, "size_id", void 0);
class ProductSizePriceResponseDto {
}
exports.ProductSizePriceResponseDto = ProductSizePriceResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductSizePriceResponseDto.prototype, "product_size_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductSizePriceResponseDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProductSizePriceProductDto),
    __metadata("design:type", ProductSizePriceProductDto)
], ProductSizePriceResponseDto.prototype, "product", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProductSizePriceSizeDto),
    __metadata("design:type", ProductSizePriceSizeDto)
], ProductSizePriceResponseDto.prototype, "size", void 0);
class ProductSizePriceListResponseDto {
}
exports.ProductSizePriceListResponseDto = ProductSizePriceListResponseDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductSizePriceResponseDto),
    __metadata("design:type", Array)
], ProductSizePriceListResponseDto.prototype, "productSizePrices", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductSizePriceListResponseDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ProductSizePriceListResponseDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ProductSizePriceListResponseDto.prototype, "limit", void 0);
class ProductSizePriceProductDto {
}
exports.ProductSizePriceProductDto = ProductSizePriceProductDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductSizePriceProductDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductSizePriceProductDto.prototype, "name", void 0);
class ProductSizePriceSizeDto {
}
exports.ProductSizePriceSizeDto = ProductSizePriceSizeDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductSizePriceSizeDto.prototype, "size_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductSizePriceSizeDto.prototype, "size_name", void 0);
//# sourceMappingURL=product-size-price.dto.js.map