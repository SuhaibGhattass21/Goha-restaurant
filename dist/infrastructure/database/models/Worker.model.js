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
exports.Worker = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_model_1 = require("./user.model");
const Worker_enums_1 = require("../../../domain/enums/Worker.enums");
const ShiftWorker_model_1 = require("./ShiftWorker.model");
let Worker = class Worker {
    constructor() {
        this.worker_id = (0, uuid_1.v4)().toString();
    }
};
exports.Worker = Worker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Worker.prototype, "worker_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Worker.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_model_1.User, (user) => user.workerProfile, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_model_1.User)
], Worker.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Worker.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Worker.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Worker_enums_1.WorkerStatus }),
    __metadata("design:type", String)
], Worker.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Worker.prototype, "base_hourly_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Worker.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Worker.prototype, "joined_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ShiftWorker_model_1.ShiftWorker, (sw) => sw.worker),
    __metadata("design:type", Array)
], Worker.prototype, "shiftAssignments", void 0);
exports.Worker = Worker = __decorate([
    (0, typeorm_1.Entity)('workers')
], Worker);
//# sourceMappingURL=Worker.model.js.map