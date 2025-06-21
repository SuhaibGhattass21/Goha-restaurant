import {
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ValidateNested,
  IsNumber,
  IsDecimal,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryExtraDto {
  @IsString()
  name!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsUUID()
  category_id!: string;
}

export class UpdateCategoryExtraDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @IsOptional()
  @IsUUID()
  category_id?: string;
}

export class CategoryExtraResponseDto {
  @IsUUID()
  extra_id!: string;

  @IsString()
  name!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryExtraCategoryDto)
  category?: CategoryExtraCategoryDto;
}

export class CategoryExtraListResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryExtraResponseDto)
  extras!: CategoryExtraResponseDto[];

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

export class CategoryExtraCategoryDto {
  @IsUUID()
  category_id!: string;

  @IsString()
  name!: string;
}