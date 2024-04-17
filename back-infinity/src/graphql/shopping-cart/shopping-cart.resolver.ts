import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { CreateShoppingCartInput } from './dto/create-shopping-cart.input';
import { UpdateShoppingCartInput } from './dto/update-shopping-cart.input';

@Resolver(() => ShoppingCart)
export class ShoppingCartResolver {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Mutation(() => ShoppingCart)
  createShoppingCart(
    @Args('createShoppingCartInput') createShoppingCartInput: CreateShoppingCartInput
  ) {
    return this.shoppingCartService.create(createShoppingCartInput);
  }

  @Query(() => [ShoppingCart], { name: 'shoppingCart' })
  findAll() {
    return this.shoppingCartService.findAll();
  }

  @Query(() => ShoppingCart, { name: 'shoppingCart' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shoppingCartService.findOne(id);
  }

  @Mutation(() => ShoppingCart)
  updateShoppingCart(
    @Args('updateShoppingCartInput') updateShoppingCartInput: UpdateShoppingCartInput
  ) {
    return this.shoppingCartService.update(updateShoppingCartInput.id, updateShoppingCartInput);
  }

  @Mutation(() => ShoppingCart)
  removeShoppingCart(@Args('id', { type: () => Int }) id: number) {
    return this.shoppingCartService.remove(id);
  }
}
