import { Repository } from "typeorm";
import { ExternalReceipt } from "../../database/models/ExternalReceipt.model";
import { CreateExternalReceiptDto } from "../../../application/dtos/Orders/external-receipt.dto";
import { IExternalReceiptRepository } from "../../../domain/repositories/Orders/external-receipt.repository.interface";
export declare class ExternalReceiptRepositoryImpl implements IExternalReceiptRepository {
    private readonly repo;
    constructor(repo: Repository<ExternalReceipt>);
    create(data: CreateExternalReceiptDto): Promise<ExternalReceipt>;
    findById(id: string): Promise<ExternalReceipt | null>;
    findAll(): Promise<ExternalReceipt[]>;
}
