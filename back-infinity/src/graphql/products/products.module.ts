import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductSchema } from './entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../category/entities/category.entity';
import { SubcategorySchema } from '../category/entities/subcategory.entity';
import { BrandSchema } from '../brands/entities/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Subcategory', schema: SubcategorySchema },
      { name: 'Brand', schema: BrandSchema },
    ]),
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
