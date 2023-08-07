import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ListProductDTO } from './dto/list-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
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
    const allProducts = await this.productService.listAll();
    return allProducts;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() requestBody: UpdateProductDTO) {
    const updatedProduct = await this.productService.update(id, requestBody);
    return {
      product: updatedProduct,
      message: 'Produto criado com sucesso!',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedProduct = await this.productService.delete(id);

    return {
      product: deletedProduct,
      message: 'Produto removido com sucesso!',
    };
  }
}
