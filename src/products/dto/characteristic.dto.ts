import { IsNotEmpty } from 'class-validator';

export class ProductCharacteristicDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
