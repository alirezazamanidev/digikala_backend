import { BaseEntity } from 'src/common/abstracts/baseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { EntityNames } from 'src/common/enums';

@Entity(EntityNames.ProductColor)
export class ProductColorEntity extends BaseEntity {
  @Column()
  productId: number;
  @Column()
  color_name: string;
  @Column()
  color_code: string;
  @Column()
  ccount: number;
  @Column()
  price: number;
  @Column({ default: 0 })
  discount: number;
  @Column({ default: false })
  active_discount: boolean;
  @ManyToOne(() => ProductEntity, (product) => product.colors, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
