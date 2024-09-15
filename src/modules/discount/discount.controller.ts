import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { CreateDiscountDTo } from './dtos/discount.dto';

@ApiTags(SwaggerTags.Discount)
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @ApiOperation({summary:'create new discount'})
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  create(@Body() discountDto:CreateDiscountDTo){
    return this.discountService.create(discountDto);

  }
}
