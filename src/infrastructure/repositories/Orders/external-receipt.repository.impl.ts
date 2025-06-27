import { Repository } from "typeorm"
import { ExternalReceipt } from "../../database/models/ExternalReceipt.model"
import { CreateExternalReceiptDto } from "../../../application/dtos/Orders/external-receipt.dto"
import { IExternalReceiptRepository } from "../../../domain/repositories/Orders/external-receipt.repository.interface"

export class ExternalReceiptRepositoryImpl implements IExternalReceiptRepository {
    constructor(private readonly repo: Repository<ExternalReceipt>) { }

    async create(data: CreateExternalReceiptDto): Promise<ExternalReceipt> {
        const receipt = this.repo.create({
            order: { order_id: data.order_id },
            shift: { shift_id: data.shift_id },
            cashier: { id: data.cashier_id },
            total_amount: data.total_amount,
            payment_method: data.payment_method,
            image_url: data.image_url,
            is_printed: data.is_printed ?? false,
            notes: data.notes,
        })

        return await this.repo.save(receipt)
    }

    async findById(id: string): Promise<ExternalReceipt | null> {
        return await this.repo.findOne({
            where: { receipt_id: id },
            relations: ["order", "shift", "cashier"],
        })
    }

    async findAll(): Promise<ExternalReceipt[]> {
        return await this.repo.find({
            order: { created_at: "DESC" },
            relations: ["order", "shift", "cashier"],
        })
    }
}
