import { Injectable } from '@nestjs/common';
import { ProductsCart } from './entities/productsCart.entity';
import { CreateShoppingCartInput } from './dto/create-shopping-cart.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtServices } from '@/services/jwt.service';
// import { UpdateShoppingCartInput } from './dto/update-shopping-cart.input';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel('ProductsCart') private shoppingCartModel: Model<ProductsCart>,
    private readonly JwtServices: JwtServices
  ) {}
  async create(id: string, createShoppingCartInput: CreateShoppingCartInput) {
    const session = await this.shoppingCartModel.startSession();
    session.startTransaction();
    let transactionCommitted = false;
    try {
      const idJwt = await this.JwtServices.validateToken(id);

      const findCart = await this.shoppingCartModel.findOne({ user: idJwt.userId });
      if (findCart) {
        const cart = await this.AddProductToCart(idJwt.userId, createShoppingCartInput);
        await session.commitTransaction();
        return cart;
      } else {
        const cart = new this.shoppingCartModel();
        cart.user = idJwt.userId;
        cart.products = [createShoppingCartInput];
        cart.total = createShoppingCartInput.total;
        cart.totalItems = 1;
        await cart.save();
        await session.commitTransaction();
        transactionCommitted = true;
        return cart;
      }
    } catch (error) {
      if (!transactionCommitted) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      session.endSession();
    }
  }
  async AddProductToCart(id: string, createShoppingCartInput: CreateShoppingCartInput) {
    const session = await this.shoppingCartModel.startSession();
    session.startTransaction();
    try {
      const findCart = await this.shoppingCartModel.findOne({ user: id });
      const productInCart = findCart.products.some(
        (e) => e.idProduct === createShoppingCartInput.idProduct
      );
      if (productInCart) {
      } else {
        const newTotal = findCart.total + createShoppingCartInput.total;
        const cart = await this.shoppingCartModel.findOneAndUpdate(
          { user: id },
          {
            $push: {
              products: createShoppingCartInput,
            },
            $set: {
              total: newTotal,
              totalItems: findCart.totalItems + 1,
            },
          },
          { new: true }
        );
        await session.commitTransaction();
        return cart;
      }
    } catch (error) {
      await session.abortTransaction();
      return error;
    } finally {
      session.endSession();
    }
  }

  async findAll(id: string) {
    try {
      const idJwt = await this.JwtServices.validateToken(id);
      const cart = await this.shoppingCartModel.findOne({ user: idJwt.userId });
      return cart;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const cart = await this.shoppingCartModel.findById(id);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateShoppingCartInput: CreateShoppingCartInput) {
    try {
      const idJwt = await this.JwtServices.validateToken(id);
      const findCart = await this.shoppingCartModel.findOne({ user: idJwt.userId });

      if (!findCart) {
        throw new Error('Cart not found');
      }

      const productInCart = findCart.products.find(
        (e) => e.idProduct === updateShoppingCartInput.idProduct
      );

      if (!productInCart) {
        throw new Error('Product not found in cart');
      }

      const tempTotal = findCart.total - productInCart.total;
      const newTotalProduct = productInCart.priceProduct * updateShoppingCartInput.quantity;
      const newTotal = tempTotal + newTotalProduct;

      const updatedProducts = findCart.products.map((e) => {
        if (e.idProduct === updateShoppingCartInput.idProduct) {
          return {
            ...e,
            quantity: updateShoppingCartInput.quantity,
            total: newTotalProduct,
          };
        }
        return e;
      });

      const cart = await this.shoppingCartModel.findOneAndUpdate(
        { user: idJwt.userId },
        {
          $set: {
            products: updatedProducts,
            total: newTotal,
          },
        },
        { new: true }
      );

      if (!cart) {
        throw new Error('Failed to update cart');
      }

      return cart;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string, idProduct: string) {
    try {
      const idJwt = await this.JwtServices.validateToken(id);
      const FindCart = await this.shoppingCartModel.findOne({ user: idJwt.userId });
      if (FindCart.products.length === 1) {
        const cart = await this.shoppingCartModel.find({ user: idJwt.userId });
        cart[0].delited = true;
        await cart[0].save();
        return await this.shoppingCartModel.findOneAndDelete({ user: idJwt.userId });
      }
      const totalProductDelete = FindCart.products.find((e) => {
        if (e.idProduct === idProduct) return e.total;
      });
      const cart = await this.shoppingCartModel.findOneAndUpdate(
        { user: idJwt.userId },
        {
          $pull: {
            products: { idProduct },
          },
          $set: {
            total: FindCart.total - totalProductDelete.total,
            totalItems: FindCart.totalItems - 1,
          },
        },
        { new: true }
      );
      return cart;
    } catch (error) {
      return error;
    }
  }
}
