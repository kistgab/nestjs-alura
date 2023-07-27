import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicDTO } from './characteristic.dto';
import { ProductImageDTO } from './image.dto';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  userId: number;

  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
  name: string;

  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Min(0, { message: 'Quantidade mínima inválida' })
  disponibleQuantity: 10;

  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  description: string;

  @ArrayMinSize(3)
  @ValidateNested()
  @Type(() => ProductCharacteristicDTO)
  characteristics: ProductCharacteristicDTO[];

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  category: string;
}
