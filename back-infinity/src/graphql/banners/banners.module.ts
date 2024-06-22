import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersResolver } from './banners.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema } from './entities/banner.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Banner', schema: BannerSchema }])],
  providers: [BannersResolver, BannersService],
})
export class BannersModule {}
