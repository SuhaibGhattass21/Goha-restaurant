import { Router } from "express";
import { ExpenseController } from "../../controllers/Shift/expense.controller";

export class ExpenseRoutes {
    private router = Router();

    constructor(private controller: ExpenseController) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.getAll.bind(this.controller));
        this.router.get("/:id", this.controller.getById.bind(this.controller));
        this.router.put("/:id", this.controller.update.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}
