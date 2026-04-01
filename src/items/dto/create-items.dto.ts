import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  image?: string;
  stock?: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(["1st Level", "2nd Level", "3rd Level", "4th Level", "Others"])
  level!: string;

  variants?: {
    type: string;
    stock: number;
  }[];

  serials?: {
    serial: string;
  }[];
}