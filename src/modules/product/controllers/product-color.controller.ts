import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ContentType, SwaggerTags } from "src/common/enums";
import { ProductColorService } from "../services/product-color.service";
import { AddColorDto } from "../dtos";

@ApiTags(SwaggerTags.ProductColor)
@Controller('product-color')
export class ProductColorController {

    constructor(private readonly productColorService:ProductColorService){}

    @ApiOperation({summary:"add new color for product"})
    @HttpCode(HttpStatus.CREATED)
    @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
    @Post('create')
    create(@Body() colorDTo:AddColorDto){
        return this.productColorService.create(colorDTo)

    }
}