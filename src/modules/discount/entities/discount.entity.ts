import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { DiscountType } from "../enums";
import { EntityNames } from "src/common/enums";
import { BasketEntity } from "src/modules/basket/entities/basket.entity";

@Entity(EntityNames.Discount)
export class DiscountEntity extends BaseEntity {
    @Column()
    code:string
    @Column({nullable:true})
    percent:number
    @Column({nullable:true})
    amount:number
    @Column({nullable:true})
    limit:number
    @Column({default:0})
    usage:number
    @Column({nullable:true})
    expiresIn:Date
    @Column({nullable:true})
    productId:number
    @Column({type:'enum',enum:DiscountType})
    type:string
    @OneToMany(() => BasketEntity, (basket) => basket.discount)
    baskets: BasketEntity[];
}