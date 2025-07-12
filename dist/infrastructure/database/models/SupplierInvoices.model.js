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
exports.SupplierInvoice = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Supplier_model_1 = require("./Supplier.model");
const SupplierPayments_model_1 = require("./SupplierPayments.model");
const Supplier_enums_1 = require("../../../domain/enums/Supplier.enums");
let SupplierInvoice = class SupplierInvoice {
    constructor() {
        this.invoice_id = (0, uuid_1.v4)().toString();
    }
};
exports.SupplierInvoice = SupplierInvoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], SupplierInvoice.prototype, "invoice_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Supplier_model_1.Supplier, (supplier) => supplier.invoices),
    (0, typeorm_1.JoinColumn)({ name: "supplier_id" }),
    __metadata("design:type", Supplier_model_1.Supplier)
], SupplierInvoice.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SupplierInvoice.prototype, "total_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Supplier_enums_1.SupplierInvoicesStatus }),
    __metadata("design:type", String)
], SupplierInvoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], SupplierInvoice.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SupplierPayments_model_1.SupplierPayment, (payment) => payment.invoice),
    __metadata("design:type", Array)
], SupplierInvoice.prototype, "payments", void 0);
exports.SupplierInvoice = SupplierInvoice = __decorate([
    (0, typeorm_1.Entity)("supplier_invoices")
], SupplierInvoice);
//# sourceMappingURL=SupplierInvoices.model.js.map