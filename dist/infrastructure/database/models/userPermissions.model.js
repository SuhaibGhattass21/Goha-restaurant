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
exports.UserPermission = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_model_1 = require("./user.model");
const permissions_model_1 = require("./permissions.model");
let UserPermission = class UserPermission {
    constructor() {
        this.id = (0, uuid_1.v4)().toString();
        this.granted_at = new Date(new Date().getTime());
        this.is_revoked = false;
    }
};
exports.UserPermission = UserPermission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "id" }),
    __metadata("design:type", String)
], UserPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.userPermissions, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_model_1.User)
], UserPermission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permissions_model_1.Permissions, (permission) => permission.userPermissions, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "permission_id" }),
    __metadata("design:type", permissions_model_1.Permissions)
], UserPermission.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User),
    (0, typeorm_1.JoinColumn)({ name: "granted_by" }),
    __metadata("design:type", user_model_1.User)
], UserPermission.prototype, "granted_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UserPermission.prototype, "granted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], UserPermission.prototype, "is_revoked", void 0);
exports.UserPermission = UserPermission = __decorate([
    (0, typeorm_1.Entity)("user_permissions")
], UserPermission);
//# sourceMappingURL=userPermissions.model.js.map