import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    try {
      return await this.categoryService.create(createCategoryInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    try {
      return await this.categoryService.update(id, updateCategoryInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Category)
  async removeCategory(@Args('id') id: string) {
    try {
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Category)
  async createSubCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Args('id') id: string
  ) {
    try {
      return await this.categoryService.createSubCategory(createCategoryInput, id);
    } catch (error) {
      return error;
    }
  }
}
