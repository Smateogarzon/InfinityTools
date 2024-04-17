import { Injectable } from '@nestjs/common';
// import { CreateShoppingCartInput } from './dto/create-shopping-cart.input';
// import { UpdateShoppingCartInput } from './dto/update-shopping-cart.input';

@Injectable()
export class ShoppingCartService {
  // create(createShoppingCartInput: CreateShoppingCartInput) {
  //   return 'This action adds a new shoppingCart';
  // }

  findAll() {
    return `This action returns all shoppingCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  // update(id: number, updateShoppingCartInput: UpdateShoppingCartInput) {
  //   return `This action updates a #${id} shoppingCart`;
  // }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
