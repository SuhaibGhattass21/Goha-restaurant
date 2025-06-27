import {
    IsUUID,
    IsEnum,
    IsOptional,
    IsString,
    IsBoolean,
    IsNumber,
    Min,
    IsDateString,
} from "class-validator"
import { OrderPaymentMethod } from "../../../domain/enums/Order.enums"

export class CreateExternalReceiptDto {
    @IsUUID()
    order_id!: string

    @IsUUID()
    shift_id!: string

    @IsUUID()
    cashier_id!: string

    @IsNumber()
    @Min(0)
    total_amount!: number

    @IsEnum(OrderPaymentMethod)
    payment_method!: OrderPaymentMethod

    @IsOptional()
    @IsString()
    image_url?: string

    @IsOptional()
    @IsBoolean()
    is_printed?: boolean

    @IsOptional()
    @IsString()
    notes?: string
}

export class ExternalReceiptResponseDto {
    @IsUUID()
    receipt_id!: string

    @IsUUID()
    order_id!: string

    @IsUUID()
    shift_id!: string

    @IsUUID()
    cashier_id!: string

    @IsNumber()
    total_amount!: number

    @IsEnum(OrderPaymentMethod)
    payment_method!: OrderPaymentMethod

    @IsOptional()
    @IsString()
    image_url?: string

    @IsBoolean()
    is_printed!: boolean

    @IsOptional()
    @IsString()
    notes?: string

    @IsDateString()
    created_at!: string
}
