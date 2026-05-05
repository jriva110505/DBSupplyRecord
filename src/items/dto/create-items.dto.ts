import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsEnum(['consumable', 'non_consumable'])
  itemType?: 'consumable' | 'non_consumable';

  @IsOptional()
  @IsArray()
  variants?: any[];

  @IsOptional()
  @IsArray()
  serials?: any[];
}