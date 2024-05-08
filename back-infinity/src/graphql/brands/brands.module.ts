import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from './entities/brand.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }])],
  providers: [BrandsResolver, BrandsService],
})
export class BrandsModule {}
