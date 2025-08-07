import { Router } from "express";
import { WorkerValidator } from "../../validators/Shift/worker.validator";
import { WorkerController } from "../../../../interfaces/http/controllers/Shift/worker.controller";

export class WorkerRoutes {
    private router: Router;

    constructor(private controller: WorkerController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", WorkerValidator.create(), this.controller.createWorker.bind(this.controller));
        this.router.get("/", WorkerValidator.getAll(), this.controller.getAllWorkers.bind(this.controller));
        this.router.get("/:id", WorkerValidator.getById(), this.controller.getWorkerById.bind(this.controller));
        this.router.put("/:id", WorkerValidator.update(), this.controller.updateWorker.bind(this.controller));
        this.router.delete("/:id", WorkerValidator.delete(), this.controller.deleteWorker.bind(this.controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}
