import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListUserDTO } from '../user/dto/list-user.dto';
import { UserEntity } from '../user/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrderDTO } from './dto/list-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './enum/order-status.enum';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<ListOrderDTO> {
    const user = await this.userRepository.findOneBy({
      id: createOrderDto.userId,
    });
    const orderEntity = new OrderEntity();
    orderEntity.status = OrderStatus.IN_PROCESS;
    orderEntity.totalValue = 0;
    orderEntity.user = user;
    await this.orderRepository.save(orderEntity);

    const listOrderDTO = new ListOrderDTO(
      orderEntity.id,
      orderEntity.totalValue,
      orderEntity.status,
      new ListUserDTO(orderEntity.user.id, orderEntity.user.name),
      orderEntity.createdAt,
      orderEntity.updatedAt,
      orderEntity.deletedAt,
    );
    return listOrderDTO;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
