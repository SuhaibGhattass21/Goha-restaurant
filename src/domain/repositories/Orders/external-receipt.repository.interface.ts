import { CreateExternalReceiptDto } from "../../../application/dtos/Orders/external-receipt.dto"
import { ExternalReceipt } from "../../../infrastructure/database/models/ExternalReceipt.model"

export interface IExternalReceiptRepository {
    create(data: CreateExternalReceiptDto): Promise<ExternalReceipt>
    findById(id: string): Promise<ExternalReceipt | null>
    findAll(): Promise<ExternalReceipt[]>
}
