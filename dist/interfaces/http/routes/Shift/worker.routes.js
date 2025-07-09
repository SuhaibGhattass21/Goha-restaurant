"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerRoutes = void 0;
const express_1 = require("express");
const worker_validator_1 = require("../../validators/Shift/worker.validator");
class WorkerRoutes {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", worker_validator_1.WorkerValidator.create(), this.controller.createWorker.bind(this.controller));
        this.router.get("/", worker_validator_1.WorkerValidator.getAll(), this.controller.getAllWorkers.bind(this.controller));
        this.router.get("/:id", worker_validator_1.WorkerValidator.getById(), this.controller.getWorkerById.bind(this.controller));
        this.router.put("/:id", worker_validator_1.WorkerValidator.update(), this.controller.updateWorker.bind(this.controller));
        this.router.delete("/:id", worker_validator_1.WorkerValidator.delete(), this.controller.deleteWorker.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.WorkerRoutes = WorkerRoutes;
//# sourceMappingURL=worker.routes.js.map