"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftController = void 0;
const class_transformer_1 = require("class-transformer");
const Shift_dto_1 = require("../../../../application/dtos/Shift/Shift.dto");
class ShiftController {
    constructor(shiftService) {
        this.shiftService = shiftService;
    }
    async openShift(req, res) {
        try {
            const shift = await this.shiftService.openShift(req.body);
            res.status(201).json({
                success: true,
                message: 'Shift opened successfully',
                data: shift,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
    async updateShiftType(req, res) {
        try {
            const dto = { ...req.body, shift_id: req.params.id };
            const shift = await this.shiftService.updateType(dto);
            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Shift type updated',
                data: shift,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
    async requestClose(req, res) {
        try {
            const dto = { ...req.body, shift_id: req.params.id };
            const shift = await this.shiftService.requestClose(dto);
            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Shift close requested',
                data: shift,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
    async approveClose(req, res) {
        try {
            const dto = { ...req.body, shift_id: req.params.id };
            const shift = await this.shiftService.approveClose(dto);
            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found or not eligible for closing',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Shift closed successfully',
                data: shift,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
    async getShiftById(req, res) {
        try {
            const shift = await this.shiftService.getById(req.params.id);
            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: shift,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
    async getShiftsByCashier(req, res) {
        try {
            const cashierId = req.params.cashierId;
            const shifts = await this.shiftService.getByCashierId(cashierId);
            res.status(200).json({
                success: true,
                data: shifts,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
    async getShiftsByStatus(req, res) {
        try {
            const dto = (0, class_transformer_1.plainToInstance)(Shift_dto_1.FilterShiftByStatusDto, { status: req.params.status });
            const shifts = await this.shiftService.getShiftsByStatus(dto);
            res.status(200).json(shifts);
        }
        catch (error) {
            console.error("Error fetching shifts by status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getRequestedCloseShifts(req, res) {
        try {
            const shifts = await this.shiftService.getRequestedCloseShifts();
            res.status(200).json(shifts);
        }
        catch (error) {
            console.error("Error getting requested-close shifts:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getShiftsByType(req, res) {
        try {
            const type = req.params.type;
            const shifts = await this.shiftService.getShiftsByType(type);
            res.status(200).json(shifts);
        }
        catch (error) {
            console.error("Error fetching shifts by type:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getShiftsByDate(req, res) {
        try {
            const date = new Date(req.query.date);
            const shifts = await this.shiftService.getShiftsByDate(date);
            res.status(200).json(shifts);
        }
        catch (error) {
            console.error("Error fetching shifts by date:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getShiftSummary(req, res) {
        try {
            const summary = await this.shiftService.getSummary(req.params.id);
            res.status(200).json({
                success: true,
                data: summary,
            });
        }
        catch (error) {
            res.status(404).json({
                success: false,
                message: error.message || 'Summary not found',
            });
        }
    }
    async getAllSummaries(req, res) {
        try {
            const summaries = await this.shiftService.getAllSummaries();
            res.status(200).json({
                success: true,
                data: summaries,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
    async delete(req, res) {
        const success = await this.shiftService.delete(req.params.id);
        res.json({ success });
    }
}
exports.ShiftController = ShiftController;
//# sourceMappingURL=shift.controller.js.map