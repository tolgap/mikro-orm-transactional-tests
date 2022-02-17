import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MikroOrmModule.forRoot(), ProductModule],
})
export class AppModule {}
