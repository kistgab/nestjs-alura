import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ListProductDTO } from './dto/listProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private async findByIdElseThrow(id: string): Promise<ProductEntity> {
    const foundProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!foundProduct) {
      throw new Error('Produto com este ID não encontrado!');
    }
    return foundProduct;
  }

  async listAll() {
    const allProducts = await this.productRepository.find();
    const allProductsDTO = allProducts.map(
      (product) => new ListProductDTO(product.id, product.name),
    );
    return allProductsDTO;
  }

  async create(requestBody: CreateProductDTO) {
    const newProduct = new ProductEntity();
    newProduct.id = uuid();
    newProduct.category = requestBody.category;
    newProduct.description = requestBody.description;
    newProduct.disponibleQuantity = requestBody.disponibleQuantity;
    newProduct.name = requestBody.name;
    newProduct.price = requestBody.price;
    newProduct.userId = requestBody.userId;
    // newProduct.characteristics = requestBody.characteristics;
    // newProduct.images = requestBody.images;
    await this.productRepository.save(newProduct);
    return {
      product: new ListProductDTO(newProduct.id, newProduct.name),
      message: 'Produto criado com sucesso!',
    };
  }

  async update(id: string, dataToUpdate: UpdateProductDTO) {
    const product = await this.findByIdElseThrow(id);
    Object.entries(dataToUpdate).forEach(([propertyName, propertyValue]) => {
      if (propertyName === 'id') {
        return;
      }
      product[propertyName] = propertyValue;
    });
    await this.productRepository.update(id, product);
    return {
      product: product,
      message: 'Produto criado com sucesso!',
    };
  }

  async delete(id: string) {
    const productToDelete = await this.findByIdElseThrow(id);
    await this.productRepository.delete(id);
    return {
      product: productToDelete,
      message: 'Produto removido com sucesso!',
    };
  }
}
