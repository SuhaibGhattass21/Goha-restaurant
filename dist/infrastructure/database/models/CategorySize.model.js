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
exports.CategorySize = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Category_model_1 = require("./Category.model");
const ProductSizePrice_model_1 = require("./ProductSizePrice.model");
let CategorySize = class CategorySize {
    constructor() {
        this.size_id = (0, uuid_1.v4)().toString();
    }
};
exports.CategorySize = CategorySize;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CategorySize.prototype, "size_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], CategorySize.prototype, "size_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_model_1.Category, (category) => category.sizes, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", Category_model_1.Category)
], CategorySize.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductSizePrice_model_1.ProductSizePrice, (psp) => psp.size, { cascade: true, orphanedRowAction: 'delete' }),
    __metadata("design:type", Array)
], CategorySize.prototype, "sizePrices", void 0);
exports.CategorySize = CategorySize = __decorate([
    (0, typeorm_1.Entity)("category_sizes")
], CategorySize);
//# sourceMappingURL=CategorySize.model.js.map