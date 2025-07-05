import { IsString, IsOptional, IsUUID, IsArray, ValidateNested, IsNumber, IsInt, Min } from "class-validator"
import { Type } from "class-transformer"

export class CreateOrderItemDto {
  @IsUUID()
  order_id!: string

  @IsUUID()
  product_size_id!: string

  @IsInt()
  @Min(1)
  quantity!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unit_price!: number

  @IsOptional()
  @IsString()
  special_instructions?: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemExtraDto)
  extras?: CreateOrderItemExtraDto[]
}

export class UpdateOrderItemDto {
  @IsOptional()
  @IsUUID()
  product_size_id?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unit_price?: number

  @IsOptional()
  @IsString()
  special_instructions?: string
}

export class OrderItemResponseDto {
  @IsUUID()
  order_item_id!: string

  @IsUUID()
  order_id!: string

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSizeInfoDto)
  product_size?: ProductSizeInfoDto

  @IsInt()
  @Min(1)
  quantity!: number

  @IsNumber({ maxDecimalPlaces: 2 })
  unit_price!: number

  @IsOptional()
  @IsString()
  special_instructions?: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemExtraResponseDto)
  extras?: OrderItemExtraResponseDto[]

  @IsNumber({ maxDecimalPlaces: 2 })
  total_price!: number
}

export class OrderItemListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemResponseDto)
  order_items!: OrderItemResponseDto[]

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

export class ProductSizeInfoDto {
  @IsUUID()
  product_size_id!: string

  @IsString()
  product_name!: string

  @IsString()
  size_name!: string

  @IsNumber({ maxDecimalPlaces: 2 })
  price!: number

  @IsString()
  category_name!: string

  @IsUUID()
  category_id!: string

  @IsOptional()
  @IsString()
  product_description?: string

  @IsOptional()
  @IsString()
  category_description?: string
}

// OrderItemExtra DTOs - FIXED: Using correct field name
export class CreateOrderItemExtraDto {
  @IsUUID()
  extra_id!: string // Changed from category_extra_id to extra_id

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number
}

export class OrderItemExtraResponseDto {
  @IsUUID()
  order_item_extra_id!: string

  @IsUUID()
  order_item_id!: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryExtraInfoDto)
  extra?: CategoryExtraInfoDto

  @IsNumber({ maxDecimalPlaces: 2 })
  price!: number
}

export class CategoryExtraInfoDto {
  @IsUUID()
  extra_id!: string // Matches your CategoryExtra model

  @IsString()
  name!: string

  @IsNumber({ maxDecimalPlaces: 2 })
  price!: number

  @IsString()
  category_name!: string
}
