import { IsInt, IsUUID, Min } from 'class-validator';

export class OrderItemDTO {
  @IsInt()
  @Min(1)
  readonly quantity: number;
  @IsUUID()
  readonly productId: string;
}
