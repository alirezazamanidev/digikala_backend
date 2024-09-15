import { BaseEntity } from "src/common/abstracts/baseEntity";
import { Column, Entity } from "typeorm";
import { DiscountType } from "../enums";
import { EntityNames } from "src/common/enums";

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

}