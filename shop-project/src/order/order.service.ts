import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListUserDTO } from '../user/dto/list-user.dto';
import { UserService } from '../user/user.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ListOrderDTO } from './dto/list-order.dto';
import { OrderStatus } from './enum/order-status.enum';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly userService: UserService,
  ) {}

  async create(createOrderDto: CreateOrderDTO): Promise<ListOrderDTO> {
    const user = await this.userService.findByIdElseThrow(
      createOrderDto.userId,
    );
    const orderEntity = new OrderEntity();
    orderEntity.status = OrderStatus.IN_PROCESS;
    orderEntity.totalValue = 0;
    orderEntity.user = user;
    await this.orderRepository.save(orderEntity);

    const listOrderDTO = new ListOrderDTO(
      orderEntity.id,
      orderEntity.totalValue,
      orderEntity.status,
      orderEntity.createdAt,
      orderEntity.updatedAt,
      orderEntity.deletedAt,
      new ListUserDTO(orderEntity.user.id, orderEntity.user.name),
    );
    return listOrderDTO;
  }

  async findAllFromUser(userId: string): Promise<ListOrderDTO[]> {
    const user = await this.userService.findByIdElseThrow(userId);

    const userOrdersDto = user.orders?.map(
      (order) =>
        new ListOrderDTO(
          order.id,
          order.totalValue,
          order.status,
          order.createdAt,
          order.updatedAt,
          order.deletedAt,
        ),
    );
    return userOrdersDto || [];
  }
}
