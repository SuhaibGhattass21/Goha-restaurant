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
exports.ShiftResponseDto = exports.FilterShiftByStatusDto = exports.ApproveCloseShiftDTO = exports.RequestCloseShiftDTO = exports.UpdateShiftTypeDTO = exports.OpenShiftDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Shift_enums_1 = require("../../../domain/enums/Shift.enums");
const Shift_enums_2 = require("../../../domain/enums/Shift.enums");
const ShiftWorker_dto_1 = require("./ShiftWorker.dto");
class OpenShiftDTO {
}
exports.OpenShiftDTO = OpenShiftDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OpenShiftDTO.prototype, "opened_by", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Shift_enums_1.ShiftType),
    __metadata("design:type", String)
], OpenShiftDTO.prototype, "shift_type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], OpenShiftDTO.prototype, "intial_balance", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ShiftWorker_dto_1.AddShiftWorkerDto),
    __metadata("design:type", Array)
], OpenShiftDTO.prototype, "workers", void 0);
class UpdateShiftTypeDTO {
}
exports.UpdateShiftTypeDTO = UpdateShiftTypeDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateShiftTypeDTO.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Shift_enums_1.ShiftType),
    __metadata("design:type", String)
], UpdateShiftTypeDTO.prototype, "shift_type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateShiftTypeDTO.prototype, "admin_id", void 0);
class RequestCloseShiftDTO {
}
exports.RequestCloseShiftDTO = RequestCloseShiftDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RequestCloseShiftDTO.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RequestCloseShiftDTO.prototype, "closed_by", void 0);
class ApproveCloseShiftDTO {
}
exports.ApproveCloseShiftDTO = ApproveCloseShiftDTO;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ApproveCloseShiftDTO.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ApproveCloseShiftDTO.prototype, "approved_by_admin_id", void 0);
class FilterShiftByStatusDto {
}
exports.FilterShiftByStatusDto = FilterShiftByStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(Shift_enums_2.ShiftStatus),
    __metadata("design:type", String)
], FilterShiftByStatusDto.prototype, "status", void 0);
class ShiftResponseDto {
}
exports.ShiftResponseDto = ShiftResponseDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ShiftResponseDto.prototype, "shift_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Shift_enums_1.ShiftType),
    __metadata("design:type", String)
], ShiftResponseDto.prototype, "shift_type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Shift_enums_2.ShiftStatus),
    __metadata("design:type", String)
], ShiftResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ShiftResponseDto.prototype, "intial_balance", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ShiftResponseDto.prototype, "is_closed", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ShiftResponseDto.prototype, "is_started_by_cashier", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ShiftResponseDto.prototype, "is_close_requested", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ShiftResponseDto.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ShiftResponseDto.prototype, "end_time", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ShiftResponseDto.prototype, "opened_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ShiftResponseDto.prototype, "closed_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ShiftResponseDto.prototype, "approved_by_admin_id", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ShiftResponseDto.prototype, "created_at", void 0);
//# sourceMappingURL=Shift.dto.js.map