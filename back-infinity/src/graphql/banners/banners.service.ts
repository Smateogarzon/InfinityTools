import { Injectable } from '@nestjs/common';
// import { CreateBannerInput } from './dto/create-banner.input';
// import { UpdateBannerInput } from './dto/update-banner.input';

@Injectable()
export class BannersService {
  // create(createBannerInput: CreateBannerInput) {
  //   return 'This action adds a new banner';
  // }

  findAll() {
    return `This action returns all banners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  // update(id: number, updateBannerInput: UpdateBannerInput) {
  //   return `This action updates a #${id} banner`;
  // }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
