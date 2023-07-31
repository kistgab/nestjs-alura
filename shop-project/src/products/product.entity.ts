import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCharacteristicDTO } from './dto/characteristic.dto';
import { ProductImageDTO } from './dto/image.dto';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'user_id', length: 100, nullable: false })
  userId: number;
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  @Column({ name: 'price', nullable: false })
  price: number;
  @Column({ name: 'disponible_quantity', nullable: false })
  disponibleQuantity: 10;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
  // characteristics: ProductCharacteristicDTO[];
  // images: ProductImageDTO[];
  @Column({ name: 'category', length: 100, nullable: false })
  category: string;
}
