import { IsOptional, IsEnum, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum PreorderFilter {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum SortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  STARTS_AT = 'startsAt',
  ENDS_AT = 'endsAt',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class FilterPreorderDto {
  @IsOptional()
  @IsEnum(PreorderFilter)
  filter?: PreorderFilter = PreorderFilter.ALL;

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 8;
}