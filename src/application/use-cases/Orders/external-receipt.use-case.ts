import { CreateExternalReceiptDto } from "../../dtos/Orders/external-receipt.dto"
import { IExternalReceiptRepository } from "../../../domain/repositories/Orders/external-receipt.repository.interface"

export class ExternalReceiptUseCases {
    constructor(private readonly repo: IExternalReceiptRepository) { }

    async create(data: CreateExternalReceiptDto) {
        return await this.repo.create(data)
    }

    async getById(id: string) {
        return await this.repo.findById(id)
    }

    async getAll() {
        return await this.repo.findAll()
    }
}
