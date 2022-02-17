import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async create(data: RequiredEntityData<Product>) {
    const product = this.productRepo.create(data);
    await this.productRepo.persistAndFlush(product);

    return product;
  }

  async find(id: number) {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product(${id}) not found`);
    }

    return product;
  }
}
