import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddColorDto {
    @ApiProperty()
    @IsNotEmpty()
    color_name: string;
    @ApiProperty()
    @IsNotEmpty()
    color_code: string;
    @ApiProperty()
    @IsNotEmpty()
    productId: number;
    @ApiPropertyOptional()
    price: number;
    @ApiPropertyOptional()
    count: number;
    @ApiPropertyOptional()
    discount: number;
    @ApiPropertyOptional({type: "boolean"})
    active_discount: boolean;
  }