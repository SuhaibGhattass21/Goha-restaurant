import { CreateExternalReceiptDto } from "../../dtos/Orders/external-receipt.dto";
import { IExternalReceiptRepository } from "../../../domain/repositories/Orders/external-receipt.repository.interface";
export declare class ExternalReceiptUseCases {
    private readonly repo;
    constructor(repo: IExternalReceiptRepository);
    create(data: CreateExternalReceiptDto): Promise<import("../../../infrastructure/database/models").ExternalReceipt>;
    getById(id: string): Promise<import("../../../infrastructure/database/models").ExternalReceipt | null>;
    getAll(): Promise<import("../../../infrastructure/database/models").ExternalReceipt[]>;
}
