import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { AddTobasketDto } from './dtos/basket.dto';
import { Auth } from 'src/common/decorators/auth.decorator';

@ApiTags(SwaggerTags.Basket)
@Controller('basket')
@Auth()
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({summary:'add to basket'})
  @HttpCode(HttpStatus.OK)
  @Post('add')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  addTobasket(@Body() addTobasketDto:AddTobasketDto){
    return this.basketService.addTobasket(addTobasketDto);
  }
}
