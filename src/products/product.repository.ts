import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  private async findById(id: String): Promise<ProductEntity> {
    const foundProduct = this.products.find((product) => product.id === id);
    if (!foundProduct) {
      throw new Error('Produto com este ID não encontrado!');
    }
    return foundProduct;
  }

  async save(product: ProductEntity) {
    this.products.push(product);
  }

  async listAll(): Promise<ProductEntity[]> {
    return this.products;
  }

  async delete(id: string): Promise<ProductEntity> {
    const productToDelete = this.findById(id);
    this.products = this.products.filter((product) => product.id !== id);
    return productToDelete;
  }

  async update(
    id: string,
    dataToUpdate: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    const product = this.findById(id);
    Object.entries(dataToUpdate).forEach(([propertyName, propertyValue]) => {
      if (propertyName === 'id') {
        return;
      }
      product[propertyName] = propertyValue;
    });
    return product;
  }
}
