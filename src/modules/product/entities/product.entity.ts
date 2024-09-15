import { BaseEntity } from 'src/common/abstracts/baseEntity';
import { EntityNames } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ProductType } from '../enums';
import { ProductColorEntity } from './product-color.entity';
import { ProductDetailEntity } from './product-dectail.entiy';
import { ProductSizeEntity } from './product-size.entity';
import { UserEntity } from 'src/modules/user/entities';
import { CategoryEntity } from 'src/modules/category/entities';

@Entity(EntityNames.Product)
export class ProductEntity extends BaseEntity {
  @Column()
  title: string;
  @Column({ unique: true })
  slug: string;
  @Column({ type: 'text' })
  content: string;
  @Column()
  supplierId:number
  @Column()
  categoryId:number
  @Column({ unique: true })
  productCode: string;
  @Column({ enum: ProductType })
  type: string;
  @Column({ default: 0 })
  count: number;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true, default: 0 })
  disCount: number;
  @Column({ nullable: true, default: false })
  active_disCount: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => ProductColorEntity, (color) => color.product)
  colors: ProductColorEntity[];
  @OneToMany(() => ProductDetailEntity, (detail) => detail.product)
  details: ProductDetailEntity[];
  @OneToMany(() => ProductSizeEntity, (size) => size.product)
  sizes: ProductSizeEntity[];
  @ManyToOne(()=>UserEntity,user=>user.products,{onDelete:'CASCADE'})
  supplier:UserEntity
  @ManyToOne(()=>CategoryEntity,category=>category.products,{onDelete:'CASCADE'})
  category:CategoryEntity
}
