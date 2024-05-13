import { Injectable } from '@nestjs/common';
// import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import main from '@/services/uploadimage.service';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(file: any) {
    const image = await main(file, 'test.png');

    console.log('🚀 ~ ProductsService ~ buffer ~ buffer:', image);
    // const image = await this.uploadimageService.uploadImage(file);

    // const session = await this.productModel.startSession();
    // session.startTransaction();
    // try {
    //   const findProduct = this.productModel.findOne({
    //     name: createProductInput.name,
    //   });
    //   if (findProduct) throw new Error('El producto ya existe');
    //   const product = new this.productModel(createProductInput);
    //   await product.save({ session });
    //   await session.commitTransaction();
    //   return product;
    // } catch (error) {
    //   await session.abortTransaction();
    //   throw error;
    // } finally {
    //   await session.endSession();
    // }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductInput: UpdateProductInput) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
