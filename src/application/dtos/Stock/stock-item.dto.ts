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
import { StockItemType, StockItemStatus, StockTransactionType } from "../../../domain/enums/Stock.enums"

export class CreateStockItemDto {
  @IsString()
  name!: string

  @IsEnum(StockItemType)
  type!: StockItemType

  @IsString()
  unit!: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  current_quantity!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  minimum_value!: number

  @IsEnum(StockItemStatus)
  status!: StockItemStatus
}

export class UpdateStockItemDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(StockItemType)
  type?: StockItemType

  @IsOptional()
  @IsString()
  unit?: string

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  current_quantity?: number

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  minimum_value?: number

  @IsOptional()
  @IsEnum(StockItemStatus)
  status?: StockItemStatus
}

export class UpdateQuantityDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  quantity!: number
}

export class StockItemIdParamDto { @IsUUID() id!: string }
export class StockItemTypeParamDto { @IsEnum(StockItemType) type!: StockItemType }
export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number
}

export class StockItemResponseDto {
  @IsUUID()
  stock_item_id!: string

  @IsString()
  name!: string

  @IsEnum(StockItemType)
  type!: StockItemType

  @IsString()
  unit!: string

  @IsNumber({ maxDecimalPlaces: 2 })
  current_quantity!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  minimum_value!: number

  @IsEnum(StockItemStatus)
  status!: StockItemStatus

  @IsDateString()
  last_updated_at!: Date

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockTransactionDto)
  transactions?: StockTransactionDto[]
}

export class StockItemListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockItemResponseDto)
  stockItems!: StockItemResponseDto[]

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

export class StockTransactionDto {
  @IsUUID()
  transaction_id!: string

  @IsEnum(StockTransactionType)
  type!: StockTransactionType

  @IsNumber({ maxDecimalPlaces: 2 })
  quantity!: number

  @IsDateString()
  timestamp!: Date
}

export class LowStockItemDto {
  @IsUUID()
  stock_item_id!: string

  @IsString()
  name!: string

  @IsNumber({ maxDecimalPlaces: 2 })
  current_quantity!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  minimum_value!: number

  @IsString()
  unit!: string
}
