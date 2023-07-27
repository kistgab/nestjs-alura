import { ProductCharacteristicDTO } from './dto/characteristic.dto';
import { ProductImageDTO } from './dto/image.dto';

export class ProductEntity {
  id: string;
  userId: number;
  name: string;
  price: number;
  disponibleQuantity: 10;
  description: string;
  characteristics: ProductCharacteristicDTO[];
  images: ProductImageDTO[];
  category: string;
}
