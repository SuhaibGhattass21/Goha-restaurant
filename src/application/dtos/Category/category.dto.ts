import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ValidateNested,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CategoryIdParamDto { @IsUUID() id!: string }

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

export class CategoryResponseDto {
  @IsUUID()
  category_id!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryProductDto)
  products?: CategoryProductDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategorySizeDto)
  sizes?: CategorySizeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryExtraDto)
  extras?: CategoryExtraDto[];
}

export class CategoryListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryResponseDto)
  categories!: CategoryResponseDto[];

  @IsInt()
  @Min(0)
  total!: number;

  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;
}

export class CategoryProductDto {
  @IsUUID() product_id!: string;
  @IsString() name!: string;
}

export class CategoryExtraDto {
  @IsUUID() extra_id!: string;
  @IsString() name!: string;
}

export class CategorySizeDto {
  @IsUUID() size_id!: string;
  @IsString() size_name!: string;
}
