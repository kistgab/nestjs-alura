import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Controller('/products')
export class ProductController {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  @Post()
  async create(@Body() requestBody) {
    await this.productRepository.save(requestBody);
    return requestBody;
  }

  @Get()
  async listAll(): Promise<any[]> {
    return await this.productRepository.listAll();
  }
}
