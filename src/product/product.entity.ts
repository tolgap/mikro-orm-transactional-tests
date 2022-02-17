import {
  BeforeCreate,
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ProductRepository } from './product.repository';

@Entity({ customRepository: () => ProductRepository })
export class Product {
  [OptionalProps]?: 'slug';

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  slug: string;

  @BeforeCreate()
  beforeCreate() {
    this.slug =
      this.slug ||
      this.name
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
  }
}
