import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategorySizeDto {
  @IsString()
  size_name!: string;

  @IsUUID()
  category_id!: string;
}

export class UpdateCategorySizeDto {
  @IsOptional()
  @IsString()
  size_name?: string;

  @IsOptional()
  @IsUUID()
  category_id?: string;
}

export class CategorySizeResponseDto {
  @IsUUID()
  size_id!: string;

  @IsString()
  size_name!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategorySizeCategoryDto)
  category?: CategorySizeCategoryDto;
}

export class CategorySizeListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategorySizeResponseDto)
  sizes!: CategorySizeResponseDto[];

  @IsNumber()
  @Min(0)
  total!: number;

  @IsNumber()
  @Min(1)
  page!: number;

  @IsNumber()
  @Min(1)
  limit!: number;
}

export class CategorySizeCategoryDto {
  @IsUUID()
  category_id!: string;

  @IsString()
  name!: string;
}