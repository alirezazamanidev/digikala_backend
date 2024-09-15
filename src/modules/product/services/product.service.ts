import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto } from '../dtos';
import { toBoolean } from 'src/common/utils';
import { BadRequestMessage, ConflictMessage, PublicMessage } from 'src/common/enums';
import slugify from 'slugify';
import { ProductType } from '../enums';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CategoryService } from 'src/modules/category/category.service';

@Injectable({scope:Scope.REQUEST})
export class ProductService {
  constructor(
    @Inject(REQUEST) private readonly request:Request,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private categoryService: CategoryService,

  ) {}

  async create(productDto: CreateProductDto) {
    let {
      title,
      type,
      slug,
      active_discount,
      discount,
      content,
      categoryId,
      count,
      price,
      product_code,
    } = productDto;
    const createProductObj: DeepPartial<ProductEntity> = {
      title,
      supplierId:this.request.user.id,
      content,
      productCode: product_code,
      active_discount: toBoolean(active_discount),
      discount,
    };
    // check exist category
    await this.categoryService.findOneById(categoryId);
    createProductObj['categoryId']=categoryId;
    // check exist by slug
    createProductObj['slug'] = slug
      ? await this.checkExitBySlug(slug)
      : await this.checkExitBySlug(
          slugify(title, { replacement: '_', lower: true, trim: true }),
        );
  
    if(type===ProductType.Single){
        Object.assign(createProductObj,{price,count,type});
    }else if([ProductType.Coloring,ProductType.Sizing].includes(type as any)){
        createProductObj['type']=type;
    }else throw new BadRequestException(BadRequestMessage.InvalidType);
    await this.productRepository.save(createProductObj);
    return {
        message:PublicMessage.Created
    }
  }

  async checkExitBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: { slug },
      select: { id: true, slug: true },
    });
    if (product) throw new ConflictException(ConflictMessage.Slug);
    return slug;
  }
}
