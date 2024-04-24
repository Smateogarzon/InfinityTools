import { Resolver } from '@nestjs/graphql';
// import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';
// import { CreateBrandInput } from './dto/create-brand.input';
// import { UpdateBrandInput } from './dto/update-brand.input';

@Resolver(() => Brand)
export class BrandsResolver {
  // constructor(private readonly brandsService: BrandsService) {}
}
