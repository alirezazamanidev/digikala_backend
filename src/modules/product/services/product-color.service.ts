import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductColorEntity, ProductEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { AddColorDto } from '../dtos';
import {
  BadRequestMessage,
  NotFoundMessage,
  PublicMessage,
} from 'src/common/enums';
import { ProductType } from '../enums';
import { toBoolean } from 'src/common/utils';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColorEntity)
    private readonly productColorRepository: Repository<ProductColorEntity>,
    private dataSourse: DataSource,
  ) {}

  async create(colorDto: AddColorDto) {
    const queryRunner = this.dataSourse.createQueryRunner();
    await queryRunner.connect();
    try {
      const {
        active_discount,

        count,
        discount,
        price,
        productId,
        color_code,
        color_name,
      } = colorDto;
      let product = await queryRunner.manager.findOneBy(ProductEntity, {
        id: productId,
      });
      if (!product) throw new NotFoundException(NotFoundMessage.Product);
      if (product.type !== ProductType.Coloring)
        throw new BadRequestException(BadRequestMessage.InvalidType);
      await queryRunner.manager.insert(ProductColorEntity, {
        count,
        discount,
        price,
        color_code,
        color_name,
        active_discount: toBoolean(active_discount),
        productId,
      });
      if (!isNaN(parseInt(count.toString())) && count > 0) {
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        await queryRunner.manager.save(ProductEntity, product);
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        message: PublicMessage.Created,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}
