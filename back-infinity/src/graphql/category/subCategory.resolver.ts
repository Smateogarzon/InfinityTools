import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Subcategory } from './entities/subcategory.entity';
import { CategoryService } from './category.service';

@Resolver(() => Subcategory)
export class SubCategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query(() => [Subcategory], { name: 'allSubcategories' })
  async findAll(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.categoryService.findAllSubCategories(id);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Subcategory, { name: 'clearSubcategory' })
  async removeSubCategory(@Args('id') id: string, @Args('categoryId') categoryId: string) {
    try {
      return await this.categoryService.removeSubCategory(id, categoryId);
    } catch (error) {
      return error;
    }
  }
}
