import {
    IsUUID,
    IsDecimal,
    IsString
} from 'class-validator';

export class SupplierInvoiceDto {
    @IsUUID()
    supplier_id!: string;

    @IsDecimal()
    total_amount!: string;

    @IsString()
    notes!: string;
}
