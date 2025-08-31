import { IsString, IsOptional, IsUUID, IsArray, ValidateNested, IsNumber, IsInt, Min, IsBoolean } from "class-validator"
import { Type } from "class-transformer"

export class CreateProductDto {
  @IsString()
  name: string = ''

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  image_url?: string

  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @IsUUID()
  category_id: string = ''
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  image_url?: string

  @IsOptional()
  @IsBoolean()
  is_active?: boolean

  @IsOptional()
  @IsUUID()
  category_id?: string
}

export class ProductIdParamDto { 
  @IsUUID() 
  id: string = ''
}

export class CategoryIdParamDto { 
  @IsUUID() 
  categoryId: string = ''
}

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

export class ProductCategoryDto {
  @IsUUID()
  category_id: string = ''

  @IsString()
  name: string = ''
}

export class ProductSizeDto {
  @IsUUID()
  size_id: string = ''

  @IsString()
  size_name: string = ''
}

export class ProductSizePriceDto {
  @IsUUID()
  product_size_id: string = ''

  @IsNumber()
  price: number = 0

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSizeDto)
  size?: ProductSizeDto
}


export class ProductResponseDto {
  @IsUUID()
  product_id: string = ''

  @IsString()
  name: string = ''

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  image_url?: string

  @IsBoolean()
  is_active: boolean = false

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductCategoryDto)
  category?: ProductCategoryDto

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSizePriceDto)
  sizePrices?: ProductSizePriceDto[]
}

export class ProductListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductResponseDto)
  products: ProductResponseDto[] = []

  @IsInt()
  @Min(0)
  total: number = 0

  @IsInt()
  @Min(1)
  page: number = 1

  @IsInt()
  @Min(1)
  limit: number = 10
}