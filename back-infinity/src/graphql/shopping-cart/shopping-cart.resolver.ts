import { Resolver } from '@nestjs/graphql';
import { ShoppingCart } from './entities/shopping-cart.entity';
// import { ShoppingCartService } from './shopping-cart.service';
// import { CreateShoppingCartInput } from './dto/create-shopping-cart.input';
// import { UpdateShoppingCartInput } from './dto/update-shopping-cart.input';

@Resolver(() => ShoppingCart)
export class ShoppingCartResolver {
  // constructor(private readonly shoppingCartService: ShoppingCartService) {}
}
