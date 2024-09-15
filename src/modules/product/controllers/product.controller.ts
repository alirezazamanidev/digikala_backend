import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { CreateProductDto } from '../dtos';
import { Auth } from 'src/common/decorators/auth.decorator';

@ApiTags(SwaggerTags.Product)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth()
  @ApiOperation({summary:"create new product"})
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  create(@Body() productDto:CreateProductDto){
    return this.productService.create(productDto)
  }
}
