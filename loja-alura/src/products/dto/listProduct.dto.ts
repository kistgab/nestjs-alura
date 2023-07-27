import { ProductCharacteristicDTO } from './characteristic.dto';
import { ProductImageDTO } from './image.dto';

export class ListProductDTO {
  constructor(readonly id: string, readonly name: string) {}
}
