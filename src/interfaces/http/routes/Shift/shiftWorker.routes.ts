import { Router } from "express";
import { ShiftWorkerController } from "../../controllers/Shift/shiftWorker.controller";
import { validateBody, validateParamsDto } from "../../middlewares/validation.middleware";
import { AddShiftWorkerDto, UpdateShiftWorkerDto, UpdateShiftWorkerEndDto, ShiftWorkerIdParamDto, ShiftIdParamDto } from "../../../../application/dtos/Shift/ShiftWorker.dto";

export class ShiftWorkerRoutes {
    private router = Router();

    constructor(private controller: ShiftWorkerController) {
        this.init();
    }

    private init() {
        this.router.post("/", validateBody(AddShiftWorkerDto), this.controller.createShiftWorker.bind(this.controller));
        this.router.put("/:id", validateParamsDto(ShiftWorkerIdParamDto), validateBody(UpdateShiftWorkerDto), this.controller.update.bind(this.controller));
        this.router.get("/:id", validateParamsDto(ShiftWorkerIdParamDto), this.controller.getShiftWorkerById.bind(this.controller));
        this.router.get("/shift/:shiftId", validateParamsDto(ShiftIdParamDto), this.controller.getWorkerByShiftId.bind(this.controller));
        this.router.delete("/:id", validateParamsDto(ShiftWorkerIdParamDto), this.controller.delete.bind(this.controller));
        this.router.patch("/end-time", validateBody(UpdateShiftWorkerEndDto), this.controller.setEndTime.bind(this.controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}
