import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsCart } from './entities/productsCart.entity';
import { Request } from 'express';
import { CreateShoppingCartInput } from './dto/create-shopping-cart.input';
import { ShoppingCartService } from './shopping-cart.service';

// import { UpdateShoppingCartInput } from './dto/update-shopping-cart.input';

@Resolver(() => ProductsCart)
export class ShoppingCartResolver {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Query(() => ProductsCart, { name: 'FindCart' })
  async FindCart(@Context('req') req: Request) {
    try {
      const id = req.cookies['session'];
      const cart = await this.shoppingCartService.findAll(id);
      if (!cart) {
        return {
          _id: '',
          products: [],
          total: 0,
        } as ProductsCart;
      }
      return cart;
    } catch (error) {
      return error;
    }
  }
  @Query(() => ProductsCart, { name: 'FindCartById' })
  async FindCartById(@Args('id') id: string) {
    try {
      const cart = await this.shoppingCartService.findOne(id);
      if (!cart) {
        return {
          _id: '',
          products: [],
          total: 0,
        } as ProductsCart;
      }
      return cart;
    } catch (error) {
      return error;
    }
  }
  @Mutation(() => ProductsCart)
  async addProductToCart(
    @Context('req') req: Request,
    @Args('createShoppingCartInput', { type: () => CreateShoppingCartInput })
    createShoppingCartInput: CreateShoppingCartInput
  ) {
    try {
      const id = req.cookies['session'];
      return await this.shoppingCartService.create(id, createShoppingCartInput);
    } catch (error) {
      return error;
    }
  }
  @Mutation(() => ProductsCart)
  async updateProductToCart(
    @Context('req') req: Request,
    @Args('createShoppingCartInput', { type: () => CreateShoppingCartInput })
    createShoppingCartInput: CreateShoppingCartInput
  ) {
    try {
      const id = req.cookies['session'];
      return await this.shoppingCartService.update(id, createShoppingCartInput);
    } catch (error) {
      return error;
    }
  }
  @Mutation(() => ProductsCart)
  async remove(@Context('req') req: Request, @Args('id') idProduct: string) {
    try {
      const id = req.cookies['session'];
      return await this.shoppingCartService.remove(id, idProduct);
    } catch (error) {
      return error;
    }
  }
}
