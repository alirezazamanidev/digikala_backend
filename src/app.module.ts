import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './configs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { DiscountModule } from './modules/discount/discount.module';
import { BasketModule } from './modules/basket/basket.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [TypeOrmModule],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    DiscountModule,
    BasketModule,
  ],
  providers: [TypeOrmDbConfig],
})
export class AppModule {}
