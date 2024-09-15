import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, Length } from "class-validator";
import { ProductType } from "../enums";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,20)
    title: string;
    @ApiProperty()
    @IsNotEmpty()
    @Length(20,400)
    content: string;
    @ApiPropertyOptional()
    slug: string;
    @ApiProperty()
    @IsNotEmpty()
    product_code: string;
    @ApiProperty({enum: ProductType})
    @IsEnum(ProductType)
    type: string;
    @ApiPropertyOptional()
    price: number;
    @ApiPropertyOptional()
    count: number;
    @ApiPropertyOptional()
    discount: number;
    @ApiPropertyOptional({type: "boolean"})
    active_discount: boolean;
    @ApiProperty()
    categoryId:number
  }