import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Query(() => [Brand], { name: 'brands' })
  async findAll() {
    try {
      return await this.brandsService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Brand)
  async createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    try {
      console.log('🚀 ~ BrandsResolver ~ createBrand ~ createBrandInput:', createBrandInput);
      return this.brandsService.create(createBrandInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('id') id: string,
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput
  ) {
    try {
      return this.brandsService.update(id, updateBrandInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Brand, { name: 'deleteBrand' })
  async deleteBrand(@Args('id') id: string) {
    try {
      return this.brandsService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
