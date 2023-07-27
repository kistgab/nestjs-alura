import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductEntity } from './product.entity';
import { ListProductDTO } from './dto/listProduct.dto';
import { v4 as uuid } from 'uuid';
import { request } from 'http';

@Controller('/products')
export class ProductController {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  @Post()
  async create(@Body() requestBody: CreateProductDTO) {
    const newProduct = new ProductEntity();
    newProduct.id = uuid();
    newProduct.category = requestBody.category;
    newProduct.characteristics = requestBody.characteristics;
    newProduct.description = requestBody.description;
    newProduct.disponibleQuantity = requestBody.disponibleQuantity;
    newProduct.images = requestBody.images;
    newProduct.name = requestBody.name;
    newProduct.price = requestBody.price;
    newProduct.userId = requestBody.userId;
    await this.productRepository.save(newProduct);
    return {
      product: new ListProductDTO(newProduct.id, newProduct.name),
      message: 'Produto criado com sucesso!',
    };
  }

  @Get()
  async listAll(): Promise<ListProductDTO[]> {
    const allProducts = await this.productRepository.listAll();
    return allProducts.map(
      (product) => new ListProductDTO(product.id, product.name),
    );
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() requestBody: UpdateProductDTO) {
    const updatedProduct = await this.productRepository.update(id, requestBody);
    return {
      product: updatedProduct,
      message: 'Produto criado com sucesso!',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedProduct = await this.productRepository.delete(id);
    return {
      product: deletedProduct,
      message: 'Produto removido com sucesso!',
    };
  }
}
