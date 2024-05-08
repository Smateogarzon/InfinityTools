import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './entities/category.entity';
import { SubcategorySchema } from './entities/subcategory.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Subcategory', schema: SubcategorySchema },
    ]),
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
