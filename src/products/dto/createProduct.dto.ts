import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicDTO } from './characteristic.dto';
import { ProductImageDTO } from './image.dto';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Min(0)
  disponibleQuantity: 10;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ArrayMinSize(3)
  @ValidateNested()
  @Type(() => ProductCharacteristicDTO)
  characteristics: ProductCharacteristicDTO[];

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsNotEmpty()
  category: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
