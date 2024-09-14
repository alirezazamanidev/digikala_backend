import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Length } from "class-validator";


export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,20)
    name:string
    @ApiPropertyOptional()
    slug:string
    @ApiPropertyOptional({required:false,nullable:true})

    parentId?:number

}