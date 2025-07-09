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
exports.ShiftWorker = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Shift_model_1 = require("./Shift.model");
const Worker_model_1 = require("./Worker.model");
let ShiftWorker = class ShiftWorker {
    constructor() {
        this.shift_worker_id = (0, uuid_1.v4)().toString();
        this.start_time = new Date();
        this.calculated_salary = 0;
    }
    ;
};
exports.ShiftWorker = ShiftWorker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ShiftWorker.prototype, "shift_worker_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shift_model_1.Shift, (shift) => shift.shiftWorkers),
    (0, typeorm_1.JoinColumn)({ name: "shift_id" }),
    __metadata("design:type", Shift_model_1.Shift)
], ShiftWorker.prototype, "shift", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Worker_model_1.Worker),
    (0, typeorm_1.JoinColumn)({ name: 'worker_id' }),
    __metadata("design:type", Worker_model_1.Worker)
], ShiftWorker.prototype, "worker", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ShiftWorker.prototype, "hourly_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], ShiftWorker.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], ShiftWorker.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ShiftWorker.prototype, "calculated_salary", void 0);
exports.ShiftWorker = ShiftWorker = __decorate([
    (0, typeorm_1.Entity)("shift_workers")
], ShiftWorker);
//# sourceMappingURL=ShiftWorker.model.js.map