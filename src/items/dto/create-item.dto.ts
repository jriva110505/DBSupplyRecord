export class CreateItemDto {
  name!: string;
  level!: string;
  stock!: number;
  image!: string;
  variants?: string;
}