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
exports.StockItem = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const StockTransaction_model_1 = require("./StockTransaction.model");
const Stock_enums_1 = require("../../../domain/enums/Stock.enums");
let StockItem = class StockItem {
    constructor() {
        this.stock_item_id = (0, uuid_1.v4)().toString();
        this.last_updated_at = new Date();
    }
};
exports.StockItem = StockItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], StockItem.prototype, "stock_item_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], StockItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Stock_enums_1.StockItemType }),
    __metadata("design:type", String)
], StockItem.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], StockItem.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], StockItem.prototype, "current_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], StockItem.prototype, "minimum_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Stock_enums_1.StockItemStatus }),
    __metadata("design:type", String)
], StockItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], StockItem.prototype, "last_updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StockTransaction_model_1.StockTransaction, (st) => st.stockItem),
    __metadata("design:type", Array)
], StockItem.prototype, "transactions", void 0);
exports.StockItem = StockItem = __decorate([
    (0, typeorm_1.Entity)("stock_items")
], StockItem);
//# sourceMappingURL=StockItem.model.js.map