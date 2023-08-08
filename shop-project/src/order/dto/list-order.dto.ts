import { ListUserDTO } from '../../user/dto/list-user.dto';
import { OrderStatus } from '../enum/order-status.enum';

export class ListOrderDTO {
  constructor(
    private readonly id: string,
    private readonly totalValue: number,
    private readonly status: OrderStatus,
    private readonly createdAt: string,
    private readonly updatedAt: string,
    private readonly deletedAt: string,
    private readonly user?: ListUserDTO,
  ) {}
}
