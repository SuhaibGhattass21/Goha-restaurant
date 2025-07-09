import { Router } from "express";
import { ExpenseController } from "../../controllers/Shift/expense.controller";
export declare class ExpenseRoutes {
    private controller;
    private router;
    constructor(controller: ExpenseController);
    private initializeRoutes;
    getRouter(): Router;
}
