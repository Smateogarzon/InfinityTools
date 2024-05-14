import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
// import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
// import { Req } from '@nestjs/common';
import * as Upload from 'graphql-upload/Upload.js';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args({ name: 'arrayFiles', type: () => [GraphQLUpload] }) arrayFiles: Upload[]
    // @Args('createProductInput') createProductInput: CreateProductInput
  ) {
    try {
      arrayFiles.forEach(async (file) => {
        console.log('file', await file);
      });
      console.log('arrayFiles', image);
      // const file = await image;
      // return this.productsService.create(file);
    } catch (error) {
      throw error;
    }
  }
}
