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
exports.Shift = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_model_1 = require("./user.model");
const ShiftWorker_model_1 = require("./ShiftWorker.model");
const Shift_enums_1 = require("../../../domain/enums/Shift.enums");
let Shift = class Shift {
    constructor() {
        this.shift_id = (0, uuid_1.v4)().toString();
        this.start_time = new Date();
        this.end_time = new Date();
        this.created_at = new Date();
    }
};
exports.Shift = Shift;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Shift.prototype, "shift_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Shift_enums_1.ShiftType }),
    __metadata("design:type", String)
], Shift.prototype, "shift_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz", nullable: false }),
    __metadata("design:type", Date)
], Shift.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: false }),
    __metadata("design:type", Date)
], Shift.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", default: Shift_enums_1.ShiftStatus.OPENED, enum: Shift_enums_1.ShiftStatus }),
    __metadata("design:type", String)
], Shift.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Shift.prototype, "initial_balance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "opened_by" }),
    __metadata("design:type", user_model_1.User)
], Shift.prototype, "opened_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "closed_by" }),
    __metadata("design:type", user_model_1.User)
], Shift.prototype, "closed_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Shift.prototype, "is_started_by_cashier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Shift.prototype, "is_close_requested", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Shift.prototype, "is_closed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "approved_by_admin_id" }),
    __metadata("design:type", user_model_1.User)
], Shift.prototype, "approved_by_admin_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ShiftWorker_model_1.ShiftWorker, (sw) => sw.shift),
    __metadata("design:type", Array)
], Shift.prototype, "shiftWorkers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Shift.prototype, "created_at", void 0);
exports.Shift = Shift = __decorate([
    (0, typeorm_1.Entity)("shifts")
], Shift);
//# sourceMappingURL=Shift.model.js.map