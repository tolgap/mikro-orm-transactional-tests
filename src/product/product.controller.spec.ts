import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let app: INestApplication;
  let productController: ProductController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(), MikroOrmModule.forFeature([Product])],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    app = module.createNestApplication().enableShutdownHooks();
    await app.init();

    productController = module.get<ProductController>(ProductController);
  });

  beforeEach(async () => {
    const orm = app.get<MikroORM>(MikroORM);
    await orm.em.begin();
  });

  afterEach(async () => {
    const orm = app.get<MikroORM>(MikroORM);
    await orm.em.rollback();
    orm.em.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return find newly created product', async () => {
    await productController.create({ id: 5, name: 'Test Product' });
    const result = await productController.show(5);

    expect(result).toEqual({
      product: {
        id: 5,
        name: 'Test Product',
        slug: 'test-product',
      },
    });
  });

  it('should not find products created in previous examples', async () => {
    await expect(productController.show(5)).rejects.toThrowError(
      NotFoundException,
    );
  });
});
