import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartResolver } from './shopping-cart.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsCartSchema } from './entities/productsCart.entity';
import { JwtServices } from '@/services/jwt.service';
import { UserSchema } from '../users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductsCart', schema: ProductsCartSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [ShoppingCartResolver, ShoppingCartService, JwtServices],
})
export class ShoppingCartModule {}
