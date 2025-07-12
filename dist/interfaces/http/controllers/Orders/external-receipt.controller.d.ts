import { Request, Response } from "express";
import { ExternalReceiptUseCases } from "../../../../application/use-cases/Orders/external-receipt.use-case";
export declare class ExternalReceiptController {
    private useCases;
    constructor(useCases: ExternalReceiptUseCases);
    create(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
}
