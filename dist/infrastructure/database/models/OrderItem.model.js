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
exports.OrderItem = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Order_model_1 = require("./Order.model");
const ProductSizePrice_model_1 = require("./ProductSizePrice.model");
const OrderItemExtra_model_1 = require("./OrderItemExtra.model");
let OrderItem = class OrderItem {
    constructor() {
        this.order_item_id = (0, uuid_1.v4)().toString();
    }
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderItem.prototype, "order_item_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_model_1.Order, (order) => order.items, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "order_id" }),
    __metadata("design:type", Order_model_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductSizePrice_model_1.ProductSizePrice, (product_size) => product_size.product, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "product_size_id" }),
    __metadata("design:type", ProductSizePrice_model_1.ProductSizePrice)
], OrderItem.prototype, "product_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "unit_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], OrderItem.prototype, "special_instructions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItemExtra_model_1.OrderItemExtra, (extra) => extra.orderItem, { cascade: true, orphanedRowAction: 'delete' }),
    __metadata("design:type", Array)
], OrderItem.prototype, "extras", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)("order_items")
], OrderItem);
//# sourceMappingURL=OrderItem.model.js.map