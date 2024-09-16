import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AddTobasketDto{
    @ApiProperty()
    productId: number;
    @ApiPropertyOptional()
    colorId: number;
    @ApiPropertyOptional()
    sizeId: number;
}