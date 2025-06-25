import { IsString, IsOptional, IsUUID, IsDateString, IsInt, Min, IsArray, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { OrderResponseDto, CashierInfoDto, ShiftInfoDto } from "./order.dto" // Reusing existing DTOs

export class CreateCancelledOrderDto {
  @IsUUID()
  order_id!: string

  @IsUUID()
  cancelled_by!: string

  @IsUUID()
  shift_id!: string

  @IsOptional()
  @IsString()
  reason?: string
}

export class CancelledOrderResponseDto {
  @IsUUID()
  cancelled_order_id!: string

  @ValidateNested()
  @Type(() => OrderResponseDto)
  order!: OrderResponseDto

  @ValidateNested()
  @Type(() => CashierInfoDto)
  cancelled_by!: CashierInfoDto

  @ValidateNested()
  @Type(() => ShiftInfoDto)
  shift!: ShiftInfoDto

  @IsOptional()
  @IsString()
  reason?: string

  @IsDateString()
  cancelled_at!: string
}

export class CancelledOrderListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CancelledOrderResponseDto)
  cancelled_orders!: CancelledOrderResponseDto[]

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
