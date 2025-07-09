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
exports.PermissionCheckResultDto = exports.UserWithPermissionDto = exports.UserPermissionDetailDto = exports.MultiplePermissionCheckResponseDto = exports.PermissionCheckResponseDto = exports.UserPermissionsResponseDto = exports.BatchAssignPermissionDto = exports.CheckMultiplePermissionsDto = exports.RevokePermissionsDto = exports.AssignPermissionsDto = exports.PermissionResponseDto = exports.UpdatePermissionDto = exports.CreatePermissionDto = void 0;
const class_validator_1 = require("class-validator");
/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePermissionDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         granted_by:
 *           type: string
 *           format: uuid
 *
 *     UpdatePermissionDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         is_revoked:
 *           type: boolean
 *
 * PermissionResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "inventory:manage"
 *         description:
 *           type: string
 *           example: "Allows inventory management operations"
 *         granted_by:
 *           type: string
 *           format: uuid
 *         granted_at:
 *           type: string
 *           format: date-time
 *         is_revoked:
 *           type: boolean
 *           example: false
 */
class CreatePermissionDto {
}
exports.CreatePermissionDto = CreatePermissionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "description", void 0);
class UpdatePermissionDto {
}
exports.UpdatePermissionDto = UpdatePermissionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePermissionDto.prototype, "is_revoked", void 0);
class PermissionResponseDto {
}
exports.PermissionResponseDto = PermissionResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PermissionResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionResponseDto.prototype, "description", void 0);
class AssignPermissionsDto {
}
exports.AssignPermissionsDto = AssignPermissionsDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AssignPermissionsDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], AssignPermissionsDto.prototype, "permissionIds", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AssignPermissionsDto.prototype, "grantedBy", void 0);
class RevokePermissionsDto {
}
exports.RevokePermissionsDto = RevokePermissionsDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RevokePermissionsDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], RevokePermissionsDto.prototype, "permissionIds", void 0);
class CheckMultiplePermissionsDto {
}
exports.CheckMultiplePermissionsDto = CheckMultiplePermissionsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CheckMultiplePermissionsDto.prototype, "permissionNames", void 0);
class BatchAssignPermissionDto {
}
exports.BatchAssignPermissionDto = BatchAssignPermissionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BatchAssignPermissionDto.prototype, "permissionId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], BatchAssignPermissionDto.prototype, "userIds", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BatchAssignPermissionDto.prototype, "granted_by", void 0);
class UserPermissionsResponseDto {
}
exports.UserPermissionsResponseDto = UserPermissionsResponseDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UserPermissionsResponseDto.prototype, "permissions", void 0);
class PermissionCheckResponseDto {
}
exports.PermissionCheckResponseDto = PermissionCheckResponseDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PermissionCheckResponseDto.prototype, "hasPermission", void 0);
class MultiplePermissionCheckResponseDto {
}
exports.MultiplePermissionCheckResponseDto = MultiplePermissionCheckResponseDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], MultiplePermissionCheckResponseDto.prototype, "permissions", void 0);
class UserPermissionDetailDto {
}
exports.UserPermissionDetailDto = UserPermissionDetailDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserPermissionDetailDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserPermissionDetailDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserPermissionDetailDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserPermissionDetailDto.prototype, "granted_by_name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserPermissionDetailDto.prototype, "is_revoked", void 0);
class UserWithPermissionDto {
}
exports.UserWithPermissionDto = UserWithPermissionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UserWithPermissionDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserWithPermissionDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserWithPermissionDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserWithPermissionDto.prototype, "granted_by_name", void 0);
class PermissionCheckResultDto {
}
exports.PermissionCheckResultDto = PermissionCheckResultDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PermissionCheckResultDto.prototype, "hasAll", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PermissionCheckResultDto.prototype, "missing", void 0);
//# sourceMappingURL=Permission.dto.js.map