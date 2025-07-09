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
exports.CancelledOrder = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Order_model_1 = require("./Order.model");
const user_model_1 = require("./user.model");
const Shift_model_1 = require("./Shift.model");
let CancelledOrder = class CancelledOrder {
    constructor() {
        this.cancelled_order_id = (0, uuid_1.v4)().toString();
        this.cancelled_at = new Date();
    }
};
exports.CancelledOrder = CancelledOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CancelledOrder.prototype, "cancelled_order_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_model_1.Order),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", Order_model_1.Order)
], CancelledOrder.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'cancelled_by' }),
    __metadata("design:type", user_model_1.User)
], CancelledOrder.prototype, "cancelled_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shift_model_1.Shift),
    (0, typeorm_1.JoinColumn)({ name: 'shift_id' }),
    __metadata("design:type", Shift_model_1.Shift)
], CancelledOrder.prototype, "shift", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CancelledOrder.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], CancelledOrder.prototype, "cancelled_at", void 0);
exports.CancelledOrder = CancelledOrder = __decorate([
    (0, typeorm_1.Entity)('cancelled_orders')
], CancelledOrder);
//# sourceMappingURL=CancelledOrder.model.js.map