import { Router } from "express";
import { ExpenseController } from "../../controllers/Shift/expense.controller";
import { validateBody, validateParamsDto } from "../../middlewares/validation.middleware";
import { CreateExpenseDto, UpdateExpenseDto, ExpenseIdParamDto } from "../../../../application/dtos/Shift/Expense.dto";

export class ExpenseRoutes {
    private router = Router();

    constructor(private controller: ExpenseController) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", validateBody(CreateExpenseDto), this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.getAll.bind(this.controller));
        this.router.get("/:id", validateParamsDto(ExpenseIdParamDto), this.controller.getById.bind(this.controller));
        this.router.put("/:id", validateParamsDto(ExpenseIdParamDto), validateBody(UpdateExpenseDto), this.controller.update.bind(this.controller));
        this.router.delete("/:id", validateParamsDto(ExpenseIdParamDto), this.controller.delete.bind(this.controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}
