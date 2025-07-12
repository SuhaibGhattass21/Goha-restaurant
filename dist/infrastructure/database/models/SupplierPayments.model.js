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
exports.SupplierPayment = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const SupplierInvoices_model_1 = require("./SupplierInvoices.model");
const user_model_1 = require("./user.model");
let SupplierPayment = class SupplierPayment {
    constructor() {
        this.payment_id = (0, uuid_1.v4)().toString();
        this.paid_at = new Date();
    }
};
exports.SupplierPayment = SupplierPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], SupplierPayment.prototype, "payment_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SupplierInvoices_model_1.SupplierInvoice, (invoice) => invoice.payments),
    (0, typeorm_1.JoinColumn)({ name: "invoice_id" }),
    __metadata("design:type", SupplierInvoices_model_1.SupplierInvoice)
], SupplierPayment.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SupplierPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_model_1.User)
], SupplierPayment.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], SupplierPayment.prototype, "paid_at", void 0);
exports.SupplierPayment = SupplierPayment = __decorate([
    (0, typeorm_1.Entity)("supplier_payments")
], SupplierPayment);
//# sourceMappingURL=SupplierPayments.model.js.map