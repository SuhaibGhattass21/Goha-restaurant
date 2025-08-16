import { IsString, IsOptional, IsUUID, IsDateString, IsInt, Min, IsArray, ValidateNested, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { OrderResponseDto, CashierInfoDto, ShiftInfoDto } from "./order.dto" // Reusing existing DTOs
import { CancellationStatus } from "../../../infrastructure/database/models/CancelledOrder.model"

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

export class ApproveCancellationDto {
  @IsUUID()
  cancelled_order_id!: string

  @IsUUID()
  approved_by!: string

  @IsEnum(CancellationStatus)
  status!: CancellationStatus // APPROVED or REJECTED
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

  @IsEnum(CancellationStatus)
  status!: CancellationStatus

  @IsOptional()
  @ValidateNested()
  @Type(() => CashierInfoDto)
  approved_by?: CashierInfoDto

  @IsDateString()
  cancelled_at!: string

  @IsOptional()
  @IsDateString()
  approved_at?: string
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
