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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_model_1 = require("./user.model");
const Shift_model_1 = require("./Shift.model");
const OrderItem_model_1 = require("./OrderItem.model");
const Order_enums_1 = require("../../../domain/enums/Order.enums");
let Order = class Order {
    constructor() {
        this.order_id = (0, uuid_1.v4)().toString();
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Order.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_model_1.User)
], Order.prototype, "cashier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shift_model_1.Shift),
    (0, typeorm_1.JoinColumn)({ name: "shift_id" }),
    __metadata("design:type", Shift_model_1.Shift)
], Order.prototype, "shift", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "table_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Order_enums_1.OrderType }),
    __metadata("design:type", String)
], Order.prototype, "order_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", default: Order_enums_1.OrderStatus.ACTIVE, enum: Order_enums_1.OrderStatus }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "customer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "customer_phone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItem_model_1.OrderItem, (item) => item.order, { cascade: true, orphanedRowAction: 'delete' }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)("orders")
], Order);
//# sourceMappingURL=Order.model.js.map