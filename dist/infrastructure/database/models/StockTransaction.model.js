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
exports.StockTransaction = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const StockItem_model_1 = require("./StockItem.model");
const user_model_1 = require("./user.model");
const Shift_model_1 = require("./Shift.model");
const Stock_enums_1 = require("../../../domain/enums/Stock.enums");
let StockTransaction = class StockTransaction {
    constructor() {
        this.transaction_id = (0, uuid_1.v4)().toString();
    }
};
exports.StockTransaction = StockTransaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], StockTransaction.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => StockItem_model_1.StockItem, (item) => item.transactions),
    (0, typeorm_1.JoinColumn)({ name: "stock_item_id" }),
    __metadata("design:type", StockItem_model_1.StockItem)
], StockTransaction.prototype, "stockItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Stock_enums_1.StockTransactionType }),
    __metadata("design:type", String)
], StockTransaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], StockTransaction.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_model_1.User)
], StockTransaction.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shift_model_1.Shift),
    (0, typeorm_1.JoinColumn)({ name: "shift_id" }),
    __metadata("design:type", Shift_model_1.Shift)
], StockTransaction.prototype, "shift", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], StockTransaction.prototype, "timestamp", void 0);
exports.StockTransaction = StockTransaction = __decorate([
    (0, typeorm_1.Entity)("stock_transactions")
], StockTransaction);
//# sourceMappingURL=StockTransaction.model.js.map