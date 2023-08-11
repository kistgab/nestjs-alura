import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/product.entity';
import { ProductService } from '../product/product.service';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService, UserService, ProductService],
})
export class OrderModule {}
