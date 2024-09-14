import { BaseEntity } from "src/common/abstracts/baseEntity";
import { EntityNames } from "src/common/enums";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity(EntityNames.Category)
export class CategoryEntity extends BaseEntity {

    @Column({unique:true})
    name:string
    @Column({unique:true})
    slug:string
    @Column({nullable:true})
    parentId:number
    @ManyToOne(()=>CategoryEntity,category=>category.children,{onDelete:'CASCADE'})
    parent:CategoryEntity
    @OneToMany(()=>CategoryEntity,cate=>cate.parent)
    children:CategoryEntity[]
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
    
}