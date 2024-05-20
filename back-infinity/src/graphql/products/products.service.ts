import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import uploadImage, { verifyImage } from '@/services/uploadimage.service';
import deleteImageFromGCS from '@/services/deleteImage.service';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(file: any, createProductInput: CreateProductInput, arrayFiles: any) {
    const session = await this.productModel.startSession();
    session.startTransaction();
    try {
      const findProduct = await this.productModel.findOne({ name: createProductInput.name });
      console.log(createProductInput.subcategory);
      if (findProduct) {
        throw new Error('El producto ya existe intente modificarlo');
      }
      let image = '';
      const images: string[] = [];
      if (file) {
        if (arrayFiles.length > 2) {
          const verify = await verifyImage(file.filename.replace(/\.[^.]*$/, ''));
          if (verify) {
            throw new Error(
              `la imagen ${file.filename.replace(/\.[^.]*$/, '')} ya existe en el servidor`
            );
          }
          for (let i = 0; i < arrayFiles.length; i++) {
            const verify = await verifyImage(arrayFiles[i].filename.replace(/\.[^.]*$/, ''));
            if (verify) {
              throw new Error(
                `la imagen ${arrayFiles[i].filename.replace(/\.[^.]*$/, '')} ya existe en el servidor`
              );
            }
          }
          for (let i = 0; i < arrayFiles.length; i++) {
            const image = await uploadImage(
              arrayFiles[i],
              arrayFiles[i].filename.replace(/\.[^.]*$/, '')
            );

            images.push(image);
          }
        } else {
          throw new Error('La imagen secundaria no pudo ser cargada');
        }

        image = await uploadImage(file, file.filename.replace(/\.[^.]*$/, ''));
      } else {
        throw new Error('La imagen principal no pudo ser cargada');
      }
      const product = new this.productModel(createProductInput);
      if (createProductInput.subcategory === '') {
        product.subcategory = null;
      }
      if (createProductInput.brand === '') {
        product.brand = null;
      }
      if (createProductInput.category === '') {
        product.category = null;
      }
      product.picture = image;
      product.extraPicture = images;
      session.commitTransaction();
      return await product.save({ session });
    } catch (error) {
      session.abortTransaction();
      return error;
    } finally {
      session.endSession();
    }
  }

  async findAll() {
    try {
      return await this.productModel.find().populate('category');
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.productModel
        .findById(id)
        .populate('category')
        .populate('subcategory')
        .populate('brand');
    } catch (error) {
      return error;
    }
  }

  async updateProductStatus(updateProductInput: UpdateProductInput) {
    try {
      return await this.productModel.findByIdAndUpdate(updateProductInput._id, {
        status: updateProductInput.status,
      });
    } catch (error) {
      return error;
    }
  }
  async update(file: any, updateProduct: UpdateProductInput, files: any) {
    console.log('🚀 ~ ProductsService ~ update ~ files:', files);
    console.log('🚀 ~ ProductsService ~ update ~ file:', file);
    try {
      console.log(updateProduct);
    } catch (error) {
      return error;
    }
  }
  async remove(id: string) {
    try {
      const product = await this.productModel.findById(id);
      const deleteImage = deleteImageFromGCS(product.picture);
      if (!deleteImage) {
        throw new Error('la imagen principal no pudo ser eliminada');
      }
      product.extraPicture.forEach(async (image) => {
        const deleteImage = deleteImageFromGCS(image);
        if (!deleteImage) {
          throw new Error('la imagen secundaria no pudo ser eliminada');
        }
      });
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  }
}
