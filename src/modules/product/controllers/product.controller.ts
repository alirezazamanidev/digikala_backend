import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/common/enums';

@ApiTags(SwaggerTags.Product)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({summary:"create new product"})
  @HttpCode(HttpStatus.CREATED)
  create(){
    
  }
}
