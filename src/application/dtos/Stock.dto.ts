import {
    IsUUID,
    IsEnum,
    IsDecimal,
    IsString,
    IsNumberString
} from 'class-validator';
import { StockTransactionType } from '@domain/enums/Stock.enums';

export class StockTransactionDto {
    @IsUUID()
    stock_item_id!: string;

    @IsEnum([StockTransactionType])
    type!: StockTransactionType;

    @IsDecimal()
    quantity!: string;

    @IsUUID()
    admin_id!: string;

    @IsUUID()
    shift_id!: string;

    @IsString()
    notes!: string;
}

export class AddStockItemDto {
    @IsString()
    name!: string;

    @IsString()
    unit!: string;

    @IsNumberString()
    initial_quantity!: string;
}
