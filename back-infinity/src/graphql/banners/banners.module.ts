import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersResolver } from './banners.resolver';

@Module({
  providers: [BannersResolver, BannersService],
})
export class BannersModule {}
