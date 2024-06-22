import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BannersService } from './banners.service';
import { Banner } from './entities/banner.entity';
import { CreateBannerInput } from './dto/create-banner.input';
import * as Upload from 'graphql-upload/Upload.js';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver(() => Banner)
export class BannersResolver {
  constructor(private readonly bannersService: BannersService) {}

  @Mutation(() => Banner)
  async createBanner(
    @Args('createBannerInput') createBannerInput: CreateBannerInput,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload
  ) {
    try {
      const file = await image;

      return await this.bannersService.create(createBannerInput, file);
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Banner], { name: 'Allbanners' })
  async findAll() {
    try {
      return await this.bannersService.findAll();
    } catch (error) {
      return error;
    }
  }
  @Query(() => [Banner], { name: 'bannerIMG' })
  async findOne(@Args('search') search: string) {
    try {
      return await this.bannersService.findOne(search);
    } catch (error) {
      return error;
    }
  }
  @Mutation(() => Banner)
  async updateBanner(@Args('updateBannerInput') updateBannerInput: CreateBannerInput) {
    try {
      return await this.bannersService.update(updateBannerInput);
    } catch (error) {
      return error;
    }
  }
  @Mutation(() => Banner)
  async removeBanner(@Args('updateBannerInput') updateBannerInput: CreateBannerInput) {
    try {
      return await this.bannersService.remove(updateBannerInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Banner)
  async deleteBanner(@Args('updateBannerInput') updateBannerInput: CreateBannerInput) {
    try {
      return await this.bannersService.delete(updateBannerInput);
    } catch (error) {
      return error;
    }
  }
}
