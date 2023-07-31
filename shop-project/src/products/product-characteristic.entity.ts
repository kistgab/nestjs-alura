import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_characteristics')
export class ProductCharacteristic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;
}
