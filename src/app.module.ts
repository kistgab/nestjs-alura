import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [UserModule, ProductsModule],
})
export class AppModule {}
