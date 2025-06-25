import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
  IsDateString,
  Min,
  IsInt,
} from "class-validator"
import { Type } from "class-transformer"
import { StockTransactionType } from "../../../domain/enums/Stock.enums"

export class CreateStockTransactionDto {
  @IsUUID()
  stock_item_id!: string

  @IsEnum(StockTransactionType)
  type!: StockTransactionType

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  quantity!: number

  @IsUUID()
  user_id!: string

  @IsUUID()
  shift_id!: string
}

export class UpdateStockTransactionDto {
  @IsOptional()
  @IsUUID()
  stock_item_id?: string

  @IsOptional()
  @IsEnum(StockTransactionType)
  type?: StockTransactionType

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  quantity?: number

  @IsOptional()
  @IsUUID()
  user_id?: string

  @IsOptional()
  @IsUUID()
  shift_id?: string
}

export class StockTransactionResponseDto {
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

  @IsUUID()
  shift_id!: string

  @IsDateString()
  timestamp!: Date
}

export class StockTransactionListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockTransactionResponseDto)
  transactions!: StockTransactionResponseDto[]

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

export class StockTransactionStatsDto {
  @IsUUID()
  stock_item_id!: string

  @IsString()
  stock_item_name!: string

  @IsNumber({ maxDecimalPlaces: 2 })
  total_in!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  total_out!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  net_change!: number

  @IsInt()
  transaction_count!: number
}

export class ShiftTransactionSummaryDto {
  @IsUUID()
  shift_id!: string

  @IsInt()
  total_transactions!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  total_in_quantity!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  total_out_quantity!: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockTransactionResponseDto)
  transactions!: StockTransactionResponseDto[]
}
