import { Router } from "express";
import { ShiftWorkerController } from "../../controllers/Shift/shiftWorker.controller";
import { ShiftWorkerValidator } from "../../validators/Shift/shiftWorker.validator";

export class ShiftWorkerRoutes {
    private router = Router();

    constructor(private controller: ShiftWorkerController) {
        this.init();
    }

    private init() {
        this.router.post("/", ShiftWorkerValidator.create(), this.controller.createShiftWorker.bind(this.controller));
        this.router.put("/:id", ShiftWorkerValidator.update(), this.controller.update.bind(this.controller));
        this.router.get("/:id", ShiftWorkerValidator.getById(), this.controller.getShiftWorkerById.bind(this.controller));
        this.router.get("/shift/:shiftId", ShiftWorkerValidator.getByShiftId(), this.controller.getWorkerByShiftId.bind(this.controller));
        this.router.delete("/:id", ShiftWorkerValidator.delete(), this.controller.delete.bind(this.controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}
