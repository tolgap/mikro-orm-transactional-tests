import { RequiredEntityData } from '@mikro-orm/core';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  async create(@Body() dto: RequiredEntityData<Product>) {
    const product = await this.service.create(dto);
    return { product };
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    const product = await this.service.find(id);
    return { product };
  }
}
