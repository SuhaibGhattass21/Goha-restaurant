import { IsString, IsOptional, IsUUID, IsArray, ValidateNested, IsNumber, IsInt, Min } from "class-validator"
import { Type } from "class-transformer"

export class CreateProductSizePriceDto {
  @IsNumber()
  price!: number

  @IsUUID()
  product_id!: string

  @IsUUID()
  size_id!: string
}

export class UpdateProductSizePriceDto {
  @IsOptional()
  @IsNumber()
  price?: number

  @IsOptional()
  @IsUUID()
  product_id?: string

  @IsOptional()
  @IsUUID()
  size_id?: string
}

export class ProductSizePriceResponseDto {
  @IsUUID()
  product_size_id!: string

  @IsNumber()
  price!: number

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSizePriceProductDto)
  product?: ProductSizePriceProductDto

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSizePriceSizeDto)
  size?: ProductSizePriceSizeDto
}

export class ProductSizePriceListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSizePriceResponseDto)
  productSizePrices!: ProductSizePriceResponseDto[]

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

export class ProductSizePriceProductDto {
  @IsUUID()
  product_id!: string

  @IsString()
  name!: string
}

export class ProductSizePriceSizeDto {
  @IsUUID()
  size_id!: string

  @IsString()
  size_name!: string
}
