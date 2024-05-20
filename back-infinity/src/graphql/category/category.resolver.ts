import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { ResponseCategory } from './entities/responseCategory.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'allCategories' })
  async findAll() {
    try {
      return await this.categoryService.findAllCategories();
    } catch (error) {
      return error;
    }
  }

  @Query(() => [ResponseCategory], { name: 'categoryRender' })
  async findRender() {
    try {
      const response = await this.categoryService.findRender();
      return response.map((categoryObject) => ({
        nameCategory: categoryObject?.name, // Use optional chaining here
        subcategories: categoryObject.subcategoryNames,
      }));
    } catch (error) {
      return error;
    }
  }
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
      return await this.categoryService.remove(id);
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
