import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { OrderItemDTO } from './order-item.dto';

export class CreateOrderDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
