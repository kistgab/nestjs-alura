import { ListUserDTO } from '../../user/dto/list-user.dto';
import { OrderStatus } from '../enum/order-status.enum';

export class ListOrderDTO {
  constructor(
    private readonly id: string,
    private readonly totalValue: number,
    private readonly status: OrderStatus,
    private readonly user?: ListUserDTO,
  ) {}
}
