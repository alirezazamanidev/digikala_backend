import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './configs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass:TypeOrmDbConfig,
    inject:[TypeOrmModule]
  }), UserModule, AuthModule, CategoryModule, ProductModule],
  providers:[TypeOrmDbConfig]
})
export class AppModule {}
