import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { ListProductDTO } from './dto/list-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductCharacteristicEntity } from './product-characteristic.entity';
import { ProductImageEntity } from './product-image.entity';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly userService: UserService,
  ) {}

  async findByIdElseThrow(id: string): Promise<ProductEntity> {
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
    newProduct.category = requestBody.category;
    newProduct.description = requestBody.description;
    newProduct.disponibleQuantity = requestBody.disponibleQuantity;
    newProduct.name = requestBody.name;
    newProduct.price = requestBody.price;
    newProduct.user = await this.userService.findByIdElseThrow(
      requestBody.userId,
    );

    const newProductCharacteristics = requestBody.characteristics.map(
      (characteristic) => {
        const newCharacteristic = new ProductCharacteristicEntity();
        newCharacteristic.description = characteristic.description;
        newCharacteristic.name = characteristic.name;
        newCharacteristic.product = newProduct;
        return newCharacteristic;
      },
    );
    const newProductImages = requestBody.images.map((image) => {
      const newImage = new ProductImageEntity();
      newImage.description = image.description;
      newImage.url = image.url;
      newImage.product = newProduct;
      return newImage;
    });

    newProduct.images = newProductImages;
    newProduct.characteristics = newProductCharacteristics;
    await this.productRepository.save(newProduct);
    return {
      product: new ListProductDTO(newProduct.id, newProduct.name),
      message: 'Produto criado com sucesso!',
    };
  }

  async update(
    id: string,
    dataToUpdate: UpdateProductDTO,
  ): Promise<ListProductDTO> {
    const product = await this.findByIdElseThrow(id);

    Object.entries(dataToUpdate).forEach(([propertyName, propertyValue]) => {
      if (propertyName === 'id') {
        return;
      }
      product[propertyName] = propertyValue;
    });
    await this.productRepository.save(product);
    const productDTO = new ListProductDTO(product.id, product.name);
    return productDTO;
  }

  async delete(id: string) {
    const productToDelete = await this.findByIdElseThrow(id);
    await this.productRepository.delete(id);
    return productToDelete;
  }
}
