import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartResolver } from './shopping-cart.resolver';

@Module({
  providers: [ShoppingCartResolver, ShoppingCartService],
})
export class ShoppingCartModule {}
