import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities';
import { DeepPartial, Repository } from 'typeorm';
import { ConflictMessage, PublicMessage } from 'src/common/enums';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(categoryDTo: CreateCategoryDto) {
    const { name, slug, parentId } = categoryDTo;

    let createObject: DeepPartial<CategoryEntity> = { name };
    createObject['slug'] = slug
      ? await this.checkExitBySlug(slug)
      : await this.checkExitBySlug(
          slugify(name, { replacement: '_', lower: true, trim: true }),
        );
    if (parentId && !isNaN(parentId)) {
      createObject['parentId'] = parentId;
    }
    const newCategory = this.categoryRepository.create(createObject);
    await this.categoryRepository.save(newCategory);
    return {
      message: PublicMessage.Created,
    };
  }

  async checkExitBySlug(slug: string) {
    const cate = await this.categoryRepository.findOne({ where: { slug } });
    if (cate) throw new ConflictException(ConflictMessage.Slug);
    return slug;
  }
}
