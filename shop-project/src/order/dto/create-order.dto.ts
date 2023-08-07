import { IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  userId: string;
}
