import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";
import { EntityNames } from "src/common/enums";

@Entity(EntityNames.ProductDetail)
export class ProductDetailEntity extends BaseEntity {
    @Column()
    productId:number
    @Column()
    key:string
    @Column()
    value:string
    @ManyToOne(() => ProductEntity, (product) => product.details, {onDelete: "CASCADE"})
    product: ProductEntity;
}