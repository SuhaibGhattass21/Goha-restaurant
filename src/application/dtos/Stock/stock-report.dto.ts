import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
  IsDateString,
  IsInt,
  IsBoolean,
} from "class-validator"
import { Type } from "class-transformer"
import { StockTransactionType, StockItemStatus } from "../../../domain/enums/Stock.enums"

export class StockReportItemDto {
  @IsUUID()
  stock_item_id!: string

  @IsString()
  name!: string

  @IsString()
  type!: string

  @IsString()
  unit!: string

  @IsNumber({ maxDecimalPlaces: 2 })
  current_quantity!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  minimum_value!: number

  @IsEnum(StockItemStatus)
  status!: StockItemStatus

  @IsBoolean()
  is_low_stock!: boolean

  @IsNumber({ maxDecimalPlaces: 2 })
  quantity_used_in_shift!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  quantity_added_in_shift!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  net_change_in_shift!: number
}
export class ShiftTransactionDetailDto {
  @IsUUID()
  transaction_id!: string

  @IsUUID()
  stock_item_id!: string

  @IsString()
  stock_item_name!: string

  @IsEnum(StockTransactionType)
  type!: StockTransactionType

  @IsNumber({ maxDecimalPlaces: 2 })
  quantity!: number

  @IsUUID()
  user_id!: string

  @IsString()
  user_name!: string

  @IsDateString()
  timestamp!: Date
}

export class ShiftStockTransactionSummaryDto {
  @IsEnum(StockTransactionType)
  type!: StockTransactionType

  @IsInt()
  transaction_count!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  total_quantity!: number
}

export class ShiftStockReportDto {
  @IsUUID()
  shift_id!: string

  @IsDateString()
  shift_date!: Date

  @IsString()
  shift_name!: string

  @IsInt()
  total_stock_items!: number

  @IsInt()
  low_stock_items_count!: number

  @IsInt()
  out_of_stock_items_count!: number

  @IsInt()
  total_transactions!: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShiftStockTransactionSummaryDto)
  transaction_summary!: ShiftStockTransactionSummaryDto[]
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShiftTransactionDetailDto)
  transactions!: ShiftTransactionDetailDto[]
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockReportItemDto)
  stock_items!: StockReportItemDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockReportItemDto)
  low_stock_items!: StockReportItemDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockReportItemDto)
  out_of_stock_items!: StockReportItemDto[]
}

export class DailyStockReportDto {
  @IsDateString()
  report_date!: Date

  @IsString()
  report_generated_at!: string

  @IsInt()
  total_shifts!: number

  @IsInt()
  total_stock_items!: number

  @IsInt()
  total_low_stock_items!: number

  @IsInt()
  total_out_of_stock_items!: number

  @IsInt()
  total_transactions!: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShiftStockReportDto)
  shift_reports!: ShiftStockReportDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockReportItemDto)
  critical_stock_items!: StockReportItemDto[]
}

export class StockReportFiltersDto {
  @IsOptional()
  @IsDateString()
  date?: string

  @IsOptional()
  @IsUUID()
  shift_id?: string

  @IsOptional()
  @IsBoolean()
  include_low_stock_only?: boolean

  @IsOptional()
  @IsString()
  stock_item_type?: string
}
