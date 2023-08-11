import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ListOrderDTO } from './dto/list-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAllFromUser(
    @Query('userId') userId: string,
  ): Promise<ListOrderDTO[]> {
    return await this.orderService.findAllFromUser(userId);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDTO): Promise<ListOrderDTO> {
    return await this.orderService.create(createOrderDto);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDTO,
  ): Promise<ListOrderDTO> {
    return await this.orderService.update(id, updateOrderDto);
  }
}
