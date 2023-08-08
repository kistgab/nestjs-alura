import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrderDTO } from './dto/list-order.dto';
import { OrderService } from './order.service';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<ListOrderDTO> {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  async findAllFromUser(
    @Query('userId') userId: string,
  ): Promise<ListOrderDTO[]> {
    return await this.orderService.findAllFromUser(userId);
  }
}
