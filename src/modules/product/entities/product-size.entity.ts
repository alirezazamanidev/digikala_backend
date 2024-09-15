import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";
import { EntityNames } from "src/common/enums";

@Entity(EntityNames.ProductSize)
export class ProductSizeEntity extends BaseEntity {
    @Column()
    productId:number
    @Column()
    size:string
    @Column()
    count:string
    @Column()
    price:number
    @Column({default:0})
    discount:number
    @Column({default: false})
    active_discount: boolean;
    @ManyToOne(() => ProductEntity, (product) => product.sizes, {onDelete: "CASCADE"})
    product: ProductEntity;

}