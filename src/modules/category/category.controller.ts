import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { CreateCategoryDto } from './dto';

@ApiTags(SwaggerTags.Category)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({summary:"create new category"})
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  @Post('create')
  create(@Body() categoryDTo:CreateCategoryDto){
    return this.categoryService.create(categoryDTo)
  }
}
