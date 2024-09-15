import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateDiscountDTo } from './dtos/discount.dto';
import { DiscountType } from './enums';
import { ProductService } from '../product/services/product.service';
import { ConflictMessage, PublicMessage } from 'src/common/enums';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private discountRepository: Repository<DiscountEntity>,
    private readonly productService: ProductService,
  ) {}

  async create(discountDto: CreateDiscountDTo) {
    const { type, amount, code, expires_in, limit, percent, productId } =
      discountDto;
    let discountObj: DeepPartial<DiscountEntity> = { code };
    if (type === DiscountType.Product && productId) {
      const product = await this.productService.findOneById(productId);
      discountObj['productId'] = product.id;
      discountObj['type'] = DiscountType.Product;
    } else {
      discountObj['type'] = DiscountType.Basket;
    }
    if (limit && !isNaN(parseInt(limit.toString())))
      discountObj['limit'] = +limit;
    if ((amount && percent) || (!amount && !percent))
      throw new BadRequestException(
        'لطفا یکی از مقدایر درصد یا مبلغ را وارد کنید',
      );
    if (amount && isNaN(parseInt(amount.toString())))
      throw new BadRequestException('مبلغ باید عدد باشد');
    else if (amount) discountObj['amount'] = +amount;
    else if (percent && isNaN(parseInt(percent.toString())))
      throw new BadRequestException('درصد باید عدد باشد!');
    else if (percent) discountObj['percent'] = +percent;
    if (expires_in && new Date(expires_in).toString() === 'Invalid Date')
      throw new BadRequestException('مدت زمان نامعتبر است!');
    else if (expires_in) discountObj['expiresIn'] = new Date(expires_in);
    await this.checkExitByCode(code);
    await this.discountRepository.save(discountObj);
    return {
      message: PublicMessage.Created,
    };
  }
  async listOfDiscount(){
    return await this.discountRepository.find({});
  }

  async checkExitByCode(code: string) {
    const discount = await this.discountRepository.findOneBy({ code });
    if (discount) throw new ConflictException(ConflictMessage.Discount);
    return code;
  }
}
