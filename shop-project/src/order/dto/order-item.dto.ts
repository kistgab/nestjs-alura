import { IsInt, IsUUID, Min } from 'class-validator';

export class OrderItemDTO {
  @IsInt()
  @Min(1)
  private readonly quantity: number;
  @IsUUID()
  private readonly productId: string;
}
