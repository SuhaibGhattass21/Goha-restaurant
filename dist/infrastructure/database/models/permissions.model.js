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
exports.Permissions = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const userPermissions_model_1 = require("./userPermissions.model");
let Permissions = class Permissions {
    constructor() {
        this.id = (0, uuid_1.v4)().toString();
        this.created_at = new Date(new Date().getTime());
    }
};
exports.Permissions = Permissions;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "id" }),
    __metadata("design:type", String)
], Permissions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], Permissions.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Permissions.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], Permissions.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userPermissions_model_1.UserPermission, (userPermission) => userPermission.permission),
    __metadata("design:type", Array)
], Permissions.prototype, "userPermissions", void 0);
exports.Permissions = Permissions = __decorate([
    (0, typeorm_1.Entity)("permissions")
], Permissions);
//# sourceMappingURL=permissions.model.js.map