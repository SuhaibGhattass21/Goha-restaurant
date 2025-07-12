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
exports.ProductSizePrice = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Product_model_1 = require("./Product.model");
const CategorySize_model_1 = require("./CategorySize.model");
let ProductSizePrice = class ProductSizePrice {
    constructor() {
        this.product_size_id = (0, uuid_1.v4)().toString();
    }
};
exports.ProductSizePrice = ProductSizePrice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProductSizePrice.prototype, "product_size_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductSizePrice.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_model_1.Product, (product) => product.sizePrices, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", Product_model_1.Product)
], ProductSizePrice.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategorySize_model_1.CategorySize, (size) => size.sizePrices, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "size_id" }),
    __metadata("design:type", CategorySize_model_1.CategorySize)
], ProductSizePrice.prototype, "size", void 0);
exports.ProductSizePrice = ProductSizePrice = __decorate([
    (0, typeorm_1.Entity)("product_size_prices")
], ProductSizePrice);
//# sourceMappingURL=ProductSizePrice.model.js.map