"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftWorkerRoutes = void 0;
const express_1 = require("express");
const shiftWorker_validator_1 = require("../../validators/Shift/shiftWorker.validator");
class ShiftWorkerRoutes {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.init();
    }
    init() {
        this.router.post("/", shiftWorker_validator_1.ShiftWorkerValidator.create(), this.controller.createShiftWorker.bind(this.controller));
        this.router.put("/:id", shiftWorker_validator_1.ShiftWorkerValidator.update(), this.controller.update.bind(this.controller));
        this.router.get("/:id", shiftWorker_validator_1.ShiftWorkerValidator.getById(), this.controller.getShiftWorkerById.bind(this.controller));
        this.router.get("/shift/:shiftId", shiftWorker_validator_1.ShiftWorkerValidator.getByShiftId(), this.controller.getWorkerByShiftId.bind(this.controller));
        this.router.delete("/:id", shiftWorker_validator_1.ShiftWorkerValidator.delete(), this.controller.delete.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.ShiftWorkerRoutes = ShiftWorkerRoutes;
//# sourceMappingURL=shiftWorker.routes.js.map