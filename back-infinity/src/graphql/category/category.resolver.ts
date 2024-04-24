import { Resolver } from '@nestjs/graphql';
// import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
// import { CreateCategoryInput } from './dto/create-category.input';
// import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  // constructor(private readonly categoryService: CategoryService) {}
}
