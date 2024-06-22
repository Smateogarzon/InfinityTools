import { Resolver } from '@nestjs/graphql';
// import { BannersService } from './banners.service';
import { Banner } from './entities/banner.entity';
// import { CreateBannerInput } from './dto/create-banner.input';
// import { UpdateBannerInput } from './dto/update-banner.input';

@Resolver(() => Banner)
export class BannersResolver {
  // constructor(private readonly bannersService: BannersService) {}
  // @Mutation(() => Banner)
  // createBanner(@Args('createBannerInput') createBannerInput: CreateBannerInput) {
  //   // return this.bannersService.create(createBannerInput);
  // }
  // @Query(() => [Banner], { name: 'banners' })
  // findAll() {
  //   return this.bannersService.findAll();
  // }
  // @Query(() => Banner, { name: 'banner' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.bannersService.findOne(id);
  // }
  // @Mutation(() => Banner)
  // updateBanner(@Args('updateBannerInput') updateBannerInput: UpdateBannerInput) {
  //   // return this.bannersService.update(updateBannerInput.id, updateBannerInput);
  // }
  // @Mutation(() => Banner)
  // removeBanner(@Args('id', { type: () => Int }) id: number) {
  //   return this.bannersService.remove(id);
  // }
}
