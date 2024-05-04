import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    try {
      return await this.productsService.create(createProductInput);
    } catch (error) {
      throw error;
    }
  }
}
