import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DiscountType } from "../enums";

export class CreateDiscountDTo {
    @ApiProperty()
    code: string;
    @ApiPropertyOptional()
    percent: number;
    @ApiPropertyOptional()
    amount: number;
    @ApiPropertyOptional()
    limit: number;
    @ApiPropertyOptional()
    expires_in: string;
    @ApiPropertyOptional()
    productId: number;
    @ApiPropertyOptional({enum: DiscountType})
    type: string;
}