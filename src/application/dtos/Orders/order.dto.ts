import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ValidateNested,
  IsNumber,
  IsInt,
  Min,
  IsEnum,
  IsDateString,
} from "class-validator"
import { Type } from "class-transformer"
import { OrderStatus, OrderType } from "../../../domain/enums/Order.enums"
import { CreateOrderItemDto, OrderItemResponseDto } from "./order-item.dto"

export class CreateOrderDto {
  @IsUUID()
  cashier_id!: string

  @IsUUID()
  shift_id!: string

  @IsOptional()
  @IsString()
  table_number?: string

  @IsEnum(OrderType)
  order_type!: OrderType

  @IsOptional()
  @IsString()
  customer_name?: string

  @IsOptional()
  @IsString()
  customer_phone?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[]
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  table_number?: string

  @IsOptional()
  @IsEnum(OrderType)
  order_type?: OrderType

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus

  @IsOptional()
  @IsString()
  customer_name?: string

  @IsOptional()
  @IsString()
  customer_phone?: string
}

export class OrderResponseDto {
  @IsUUID()
  order_id!: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CashierInfoDto)
  cashier?: CashierInfoDto

  @IsOptional()
  @ValidateNested()
  @Type(() => ShiftInfoDto)
  shift?: ShiftInfoDto

  @IsOptional()
  @IsString()
  table_number?: string

  @IsEnum(OrderType)
  order_type!: OrderType

  @IsEnum(OrderStatus)
  status!: OrderStatus

  @IsNumber({ maxDecimalPlaces: 2 })
  total_price!: number

  @IsOptional()
  @IsString()
  customer_name?: string

  @IsOptional()
  @IsString()
  customer_phone?: string

  @IsDateString()
  created_at!: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemResponseDto)
  items!: OrderItemResponseDto[]

  @IsInt()
  @Min(0)
  items_count!: number
}

export class OrderListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderResponseDto)
  orders!: OrderResponseDto[]

  @IsInt()
  @Min(0)
  total!: number

  @IsInt()
  @Min(1)
  page!: number

  @IsInt()
  @Min(1)
  limit!: number
}

export class OrderSummaryDto {
  @IsUUID()
  order_id!: string

  @IsString()
  table_number?: string

  @IsEnum(OrderType)
  order_type!: OrderType

  @IsEnum(OrderStatus)
  status!: OrderStatus

  @IsNumber({ maxDecimalPlaces: 2 })
  total_price!: number

  @IsString()
  customer_name?: string

  @IsDateString()
  created_at!: string

  @IsInt()
  items_count!: number
}

export class CashierInfoDto {
  @IsUUID()
  id!: string

  @IsString()
  username!: string

  @IsString()
  fullName!: string
}

export class ShiftInfoDto {
  @IsUUID()
  shift_id!: string

  @IsEnum(OrderType)
  shift_type!: string

  @IsDateString()
  start_time!: string

  @IsString()
  status!: string
}

// Order Statistics DTOs
export class OrderStatsDto {
  @IsInt()
  @Min(0)
  total_orders!: number

  @IsInt()
  @Min(0)
  active_orders!: number

  @IsInt()
  @Min(0)
  completed_orders!: number

  @IsInt()
  @Min(0)
  cancelled_orders!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  total_revenue!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  average_order_value!: number
}
