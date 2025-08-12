import { Router } from "express";
import { WorkerValidator } from "../../validators/Shift/worker.validator";
import { WorkerController } from "../../../../interfaces/http/controllers/Shift/worker.controller";
import { AuthorizationMiddleware } from "../../../../interfaces/http/middlewares/authorization.middleware";

export class WorkerRoutes {
    private router: Router;

    constructor(private controller: WorkerController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:workers']), WorkerValidator.create(), this.controller.createWorker.bind(this.controller));
        this.router.get("/", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:workers']), WorkerValidator.getAll(), this.controller.getAllWorkers.bind(this.controller));
        this.router.get("/:id", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:workers']), WorkerValidator.getById(), this.controller.getWorkerById.bind(this.controller));
        this.router.put("/:id", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:workers']), WorkerValidator.update(), this.controller.updateWorker.bind(this.controller));
        this.router.delete("/:id", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:workers']), WorkerValidator.delete(), this.controller.deleteWorker.bind(this.controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}
