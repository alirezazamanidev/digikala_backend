import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColorEntity, ProductEntity } from './entities';
import { CategoryModule } from '../category/category.module';
import { ProductColorController } from './controllers/product-color.controller';
import { ProductColorService } from './services/product-color.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,ProductColorEntity]),CategoryModule],
  controllers: [ProductController,ProductColorController],
  providers: [ProductService,ProductColorService],
  exports:[ProductService]
})
export class ProductModule {}
