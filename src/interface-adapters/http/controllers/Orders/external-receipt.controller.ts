import { Request, Response } from "express"
import { ExternalReceiptUseCases } from "../../../../application/use-cases/Orders/external-receipt.use-case"
import { CreateExternalReceiptDto } from "../../../../application/dtos/Orders/external-receipt.dto"

export class ExternalReceiptController {
    constructor(private useCases: ExternalReceiptUseCases) { }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const result = await this.useCases.create(data);
        res.status(201).json(result); // No return here
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const receipts = await this.useCases.getAll();
        res.status(200).json(receipts);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const receipt = await this.useCases.getById(id)
        if (!receipt) res.status(404).json({ message: "Receipt not found" })
        res.json(receipt)
    }
}
