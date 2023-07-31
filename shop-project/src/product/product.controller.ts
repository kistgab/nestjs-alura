import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ListProductDTO } from './dto/listProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() requestBody: CreateProductDTO) {
    return this.productService.create(requestBody);
  }

  @Get()
  async listAll(): Promise<ListProductDTO[]> {
    return this.productService.listAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() requestBody: UpdateProductDTO) {
    return this.productService.update(id, requestBody);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
