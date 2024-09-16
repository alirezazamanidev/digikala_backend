import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { AddTobasketDto } from './dtos/basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from './entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProductColorEntity, ProductSizeEntity } from '../product/entities';
import { ProductService } from '../product/services/product.service';
import { ProductType } from '../product/enums';
import { ProductColorService } from '../product/services/product-color.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PublicMessage } from 'src/common/enums';

@Injectable({scope:Scope.REQUEST})
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity)
    private readonly basketRepository: Repository<BasketEntity>,
    private readonly productService: ProductService,
    private readonly productColorService: ProductColorService,
    @Inject(REQUEST) private readonly request:Request
  ) {}
  async addTobasket(basketDto: AddTobasketDto) {
    let { colorId, sizeId, productId } = basketDto;
    let size: ProductSizeEntity;
    let color: ProductColorEntity;
    let where: FindOptionsWhere<BasketEntity> = {};;
    const product = await this.productService.findOneById(productId);
    if (product.count === 0)
      throw new BadRequestException('محصول در انبار تمام شده است');
    where['productId'] = product.id;
    if (product.type === ProductType.Coloring && !colorId)
      throw new BadRequestException('لطفا رنگی را برای مخصول انتخاب کنید!');
    else if (product.type === ProductType.Coloring && colorId) {
      if (isNaN(parseInt(colorId?.toString())))
        throw new BadRequestException('لطفا رنگی را برای مخصول انتخاب کنید!');
      color = await this.productColorService.findOneById(colorId);
      where['colorId'] = colorId;
    }
    let basketItem=await this.basketRepository.findOneBy(where);
    if(basketItem){
        basketItem.count+=1;
        if(basketItem.count > product.count)
             throw new BadRequestException('تعداد محصول مورد نظر به پایان رسید');
    }else{
        basketItem=this.basketRepository.create({
            productId,
            sizeId:size?.id,
            colorId:color?.id,
            count:1,
            userId:this.request.user.id
        });
    }
    await this.basketRepository.save(basketItem);
    return {
        message:PublicMessage.AddToBasket
    }
  }
}
