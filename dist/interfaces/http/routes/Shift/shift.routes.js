"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftRoutes = void 0;
const express_1 = require("express");
const shift_validator_1 = require("../../validators/Shift/shift.validator");
class ShiftRoutes {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', shift_validator_1.ShiftValidator.open(), this.controller.openShift.bind(this.controller));
        this.router.patch('/:id/type', shift_validator_1.ShiftValidator.updateType(), this.controller.updateShiftType.bind(this.controller));
        this.router.patch('/:id/request-close', shift_validator_1.ShiftValidator.requestClose(), this.controller.requestClose.bind(this.controller));
        this.router.patch('/:id/approve-close', shift_validator_1.ShiftValidator.approveClose(), this.controller.approveClose.bind(this.controller));
        this.router.get('/:id', shift_validator_1.ShiftValidator.getById(), this.controller.getShiftById.bind(this.controller));
        this.router.get("/status/:status", shift_validator_1.ShiftValidator.getByStatus(), this.controller.getShiftsByStatus.bind(this.controller));
        this.router.get("/close-requested", this.controller.getRequestedCloseShifts.bind(this.controller));
        this.router.get('/cashier/:cashierId', shift_validator_1.ShiftValidator.getByCashier(), this.controller.getShiftsByCashier.bind(this.controller));
        this.router.get("/type/:type", this.controller.getShiftsByType.bind(this.controller));
        this.router.get("/by-date", this.controller.getShiftsByDate.bind(this.controller));
        this.router.get('/:id/summary', this.controller.getShiftSummary.bind(this.controller));
        this.router.get('/summaries/all', this.controller.getAllSummaries.bind(this.controller));
        this.router.delete('/:id', shift_validator_1.ShiftValidator.getById(), this.controller.delete.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.ShiftRoutes = ShiftRoutes;
//# sourceMappingURL=shift.routes.js.map