import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductInput, Filters } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
// import { Req } from '@nestjs/common';
import * as Upload from 'graphql-upload/Upload.js';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'allProducts' })
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Query(() => Product, { name: 'FindOneproduct' })
  async findOne(@Args('id') id: string) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Product], { name: 'FindAllproductsFilter' })
  async filters(@Args('filter') filter: Filters) {
    try {
      return await this.productsService.filters(filter);
    } catch (error) {
      return error;
    }
  }
  @Query(() => [Product], { name: 'FindDescountProduct' })
  async findDescount(@Args('filter') filter: string) {
    try {
      return await this.productsService.findDescount(filter);
    } catch (error) {
      return error;
    }
  }
  @Query(() => [Product], { name: 'FindMoreSales' })
  async findMoreSales() {
    try {
      return await this.productsService.findMoreSales();
    } catch (error) {
      return error;
    }
  }
  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args({ name: 'arrayFiles', type: () => [GraphQLUpload] }) arrayFiles: Upload[],
    @Args('createProductInput') createProductInput: CreateProductInput
  ) {
    try {
      const files = await Promise.all(arrayFiles.map(async (file) => await file));
      const file = await image;
      return this.productsService.create(file, createProductInput, files);
    } catch (error) {
      throw error;
    }
  }
  @Mutation(() => Product, { name: 'updateProduct' })
  async update(
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true }) image: Upload,
    @Args({ name: 'filesCompare', type: () => [String], nullable: true }) filesCompare: string[],
    @Args({ name: 'arrayFiles', type: () => [GraphQLUpload], nullable: true })
    arrayFiles: Upload[],
    @Args('updateProductInput') updateProductInput: UpdateProductInput
  ) {
    try {
      let file = null;
      if (image !== null) {
        file = await image;
      }
      let files = null;
      if (arrayFiles !== undefined && arrayFiles.length > 0) {
        files = await Promise.all(arrayFiles.map(async (file) => await file));
      }
      return this.productsService.update(file, filesCompare, updateProductInput, files);
    } catch (error) {
      return error;
    }
  }
  @Mutation(() => Product, { name: 'updateProductStatus' })
  async updateProductStatus(
    @Args('updateProductStatusInput') updateProductStatusInput: UpdateProductInput
  ) {
    try {
      return await this.productsService.updateProductStatus(updateProductStatusInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Product, { name: 'deleteProduct' })
  async remove(@Args('id') id: string) {
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
