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
exports.CategorySizeCategoryDto = exports.CategorySizeListResponseDto = exports.CategorySizeResponseDto = exports.UpdateCategorySizeDto = exports.CreateCategorySizeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateCategorySizeDto {
}
exports.CreateCategorySizeDto = CreateCategorySizeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategorySizeDto.prototype, "size_name", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCategorySizeDto.prototype, "category_id", void 0);
class UpdateCategorySizeDto {
}
exports.UpdateCategorySizeDto = UpdateCategorySizeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCategorySizeDto.prototype, "size_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateCategorySizeDto.prototype, "category_id", void 0);
class CategorySizeResponseDto {
}
exports.CategorySizeResponseDto = CategorySizeResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CategorySizeResponseDto.prototype, "size_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategorySizeResponseDto.prototype, "size_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CategorySizeCategoryDto),
    __metadata("design:type", CategorySizeCategoryDto)
], CategorySizeResponseDto.prototype, "category", void 0);
class CategorySizeListResponseDto {
}
exports.CategorySizeListResponseDto = CategorySizeListResponseDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CategorySizeResponseDto),
    __metadata("design:type", Array)
], CategorySizeListResponseDto.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CategorySizeListResponseDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CategorySizeListResponseDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CategorySizeListResponseDto.prototype, "limit", void 0);
class CategorySizeCategoryDto {
}
exports.CategorySizeCategoryDto = CategorySizeCategoryDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CategorySizeCategoryDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategorySizeCategoryDto.prototype, "name", void 0);
//# sourceMappingURL=category-size.dto.js.map