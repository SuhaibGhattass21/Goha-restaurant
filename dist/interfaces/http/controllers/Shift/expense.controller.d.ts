import { Request, Response } from "express";
import { ExpenseService } from "../../../../domain/services/Shift/Expense.service";
export declare class ExpenseController {
    private service;
    constructor(service: ExpenseService);
    create(req: Request, res: Response): Promise<void>;
    getAll(_: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
