import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'orders_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'preco_venda' })
  precoVenda: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;
}
