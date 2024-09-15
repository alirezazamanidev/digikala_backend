import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities';
import { CategoryModule } from '../category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity]),CategoryModule],
  controllers: [ProductController],
  providers: [ProductService,],
})
export class ProductModule {}
