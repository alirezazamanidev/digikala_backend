import { BaseEntity } from 'src/common/abstracts/baseEntity';
import { EntityNames } from 'src/common/enums';
import { DiscountEntity } from 'src/modules/discount/entities/discount.entity';
import {
  ProductColorEntity,
  ProductEntity,
} from 'src/modules/product/entities';
import { UserEntity } from 'src/modules/user/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity(EntityNames.Basket)
export class BasketEntity extends BaseEntity {
  @Column()
  userId: number;
  @Column({ nullable: true })
  productId: number;
  @Column({ nullable: true })
  sizeId: number;
  @Column({ nullable: true })
  colorId: number;
  @Column({ nullable: true })
  discountId: number;
  @Column()
  count: number;
  @ManyToOne(() => ProductEntity, (product) => product.baskets, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
  @ManyToOne(() => ProductColorEntity, (color) => color.baskets, {
    onDelete: 'CASCADE',
  })
  color: ProductColorEntity;

  @ManyToOne(() => DiscountEntity, (discount) => discount.baskets, {
    onDelete: 'CASCADE',
  })
  discount: DiscountEntity;
  @ManyToOne(()=>UserEntity,user=>user.baskets,{onDelete:'CASCADE'})
  user:UserEntity
}
