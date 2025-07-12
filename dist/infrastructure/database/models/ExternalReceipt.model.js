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
exports.ExternalReceipt = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Shift_model_1 = require("./Shift.model");
const user_model_1 = require("./user.model");
const Order_model_1 = require("./Order.model");
const Order_enums_1 = require("../../../domain/enums/Order.enums");
let ExternalReceipt = class ExternalReceipt {
    constructor() {
        this.receipt_id = (0, uuid_1.v4)().toString();
        this.created_at = new Date();
    }
};
exports.ExternalReceipt = ExternalReceipt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ExternalReceipt.prototype, "receipt_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_model_1.Order),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", Order_model_1.Order)
], ExternalReceipt.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shift_model_1.Shift),
    (0, typeorm_1.JoinColumn)({ name: "shift_id" }),
    __metadata("design:type", Shift_model_1.Shift)
], ExternalReceipt.prototype, "shift", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'cashier_id' }),
    __metadata("design:type", user_model_1.User)
], ExternalReceipt.prototype, "cashier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ExternalReceipt.prototype, "total_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', default: Order_enums_1.OrderPaymentMethod.CASH, enum: Order_enums_1.OrderPaymentMethod }),
    __metadata("design:type", String)
], ExternalReceipt.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ExternalReceipt.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ExternalReceipt.prototype, "is_printed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ExternalReceipt.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], ExternalReceipt.prototype, "created_at", void 0);
exports.ExternalReceipt = ExternalReceipt = __decorate([
    (0, typeorm_1.Entity)("external_receipts")
], ExternalReceipt);
//# sourceMappingURL=ExternalReceipt.model.js.map