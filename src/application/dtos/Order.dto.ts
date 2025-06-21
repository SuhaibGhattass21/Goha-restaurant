import {
    IsUUID,
    IsInt,
    Min,
    IsEnum,
    IsString,
    IsOptional,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderType } from '@domain/enums/Order.enums';
import { OrderStatus } from '@domain/enums/Order.enums';

export class OrderItemInputDto {
    @IsUUID()
    product_size_id!: string;

    @IsInt()
    @Min(1)
    quantity!: number;

    @IsOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    extras?: string[];
}

export class CreateOrderDto {
    @IsEnum([OrderType])
    order_type!: OrderType;

    @IsOptional()
    @IsString()
    table_number?: string;

    @IsUUID()
    cashier_id!: string;

    @IsUUID()
    shift_id!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemInputDto)
    items!: OrderItemInputDto[];
}

export class CancelOrderDto {
    @IsUUID()
    order_id!: string;

    @IsUUID()
    admin_id!: string;

    @IsOptional()
    @IsString()
    reason?: string;
}

export class UpdateOrderStatusDto {
    @IsUUID()
    order_id!: string;

    @IsEnum(OrderStatus)
    status!: OrderStatus;
}

