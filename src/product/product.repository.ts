import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from './product.entity';

export class ProductRepository extends EntityRepository<Product> {}
