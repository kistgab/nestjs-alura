import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { ProductService } from '../product/product.service';
import { ListUserDTO } from '../user/dto/list-user.dto';
import { UserService } from '../user/user.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ListOrderDTO } from './dto/list-order.dto';
import { OrderItemDTO } from './dto/order-item.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { OrderStatus } from './enum/order-status.enum';
import { OrderItemEntity } from './order-item.entity';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  private async getOrderItemFromOrderItemDTO(
    orderItemDto: OrderItemDTO,
  ): Promise<OrderItemEntity> {
    const orderItemEntity = new OrderItemEntity();
    orderItemEntity.product = await this.productService.findByIdElseThrow(
      orderItemDto.productId,
    );
    orderItemEntity.quantity = orderItemDto.quantity;
    orderItemEntity.precoVenda = orderItemEntity.product.price;
    return orderItemEntity;
  }

  private getPriceFromOrderItem(orderItem: OrderItemEntity): number {
    return orderItem.precoVenda * orderItem.quantity;
  }

  private async findByIdElseThrow(id: string): Promise<OrderEntity> {
    const foundOrder = await this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!foundOrder) {
      throw new NotFoundException('Pedido com este ID não encontrado!');
    }
    return foundOrder;
  }

  private validateOrderQuantityHigherThanDisponibleQuantity(
    orderItem: OrderItemDTO,
    stockProduct: ProductEntity,
  ) {
    if (orderItem.quantity > stockProduct.disponibleQuantity) {
      throw new BadRequestException(
        `Você está pedindo a quantidade ${orderItem.quantity} do item ${stockProduct.name}, porém apenas temos disponibilidade para ${stockProduct.disponibleQuantity}`,
      );
    }
  }

  private validateCreateOrderData(
    createOrderItems: OrderItemDTO[],
    orderItems: OrderItemEntity[],
  ) {
    createOrderItems.forEach((createOrderItem) => {
      const equivalentItem = orderItems.find(
        (ordemItem) => ordemItem.product.id === createOrderItem.productId,
      );
      if (!equivalentItem) {
        return;
      }
      this.validateOrderQuantityHigherThanDisponibleQuantity(
        createOrderItem,
        equivalentItem.product,
      );
    });
  }

  async create(createOrderDto: CreateOrderDTO): Promise<ListOrderDTO> {
    const user = await this.userService.findByIdElseThrow(
      createOrderDto.userId,
    );
    const orderItemsEntity = await Promise.all(
      createOrderDto.items.map(
        async (orderItemDto): Promise<OrderItemEntity> =>
          await this.getOrderItemFromOrderItemDTO(orderItemDto),
      ),
    );
    this.validateCreateOrderData(createOrderDto.items, orderItemsEntity);
    const orderEntity = new OrderEntity();
    orderEntity.status = OrderStatus.IN_PROCESS;
    orderEntity.user = user;
    orderEntity.items = orderItemsEntity;
    orderEntity.totalValue = orderEntity.items.reduce(
      (total, orderItem) => total + this.getPriceFromOrderItem(orderItem),
      0,
    );

    await this.orderRepository.save(orderEntity);
    const listOrderDTO = new ListOrderDTO(
      orderEntity.id,
      orderEntity.totalValue,
      orderEntity.status,
      new ListUserDTO(orderEntity.user.id, orderEntity.user.name),
    );
    return listOrderDTO;
  }

  async findAllFromUser(userId: string): Promise<ListOrderDTO[]> {
    const user = await this.userService.findByIdElseThrow(userId);

    const userOrdersDto = user.orders?.map(
      (order) => new ListOrderDTO(order.id, order.totalValue, order.status),
    );
    return userOrdersDto || [];
  }

  async update(
    orderId: string,
    updateOrderDto: UpdateOrderDTO,
  ): Promise<ListOrderDTO> {
    const order = await this.findByIdElseThrow(orderId);
    order.status = updateOrderDto.status;
    this.orderRepository.save(order);
    return new ListOrderDTO(
      order.id,
      order.totalValue,
      order.status,
      new ListUserDTO(order.user.id, order.user.name),
    );
  }
}
