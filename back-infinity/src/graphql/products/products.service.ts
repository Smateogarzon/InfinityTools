import { Injectable } from '@nestjs/common';
import { CreateProductInput, Filters } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import uploadImage, { verifyImage } from '@/services/uploadimage.service';
import deleteImageFromGCS from '@/services/deleteImage.service';
import { Category } from '../category/entities/category.entity';
import { Subcategory } from '../category/entities/subcategory.entity';
import { Brand } from '../brands/entities/brand.entity';

interface IFilterProducts {
  name?: { $regex: string; $options: string };
  category?: string;
  brand?: string;
  sellingPrice?: 'Mayor Precio' | 'Menor Precio';
  salesNumber?: 'Menores Ventas' | 'Mayores Ventas';
}
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Category') private categoryModel: Model<Category>,
    @InjectModel('Subcategory') private subcategoryModel: Model<Subcategory>,
    @InjectModel('Brand') private brandModel: Model<Brand>
  ) {}

  async create(file: any, createProductInput: CreateProductInput, arrayFiles: any) {
    const session = await this.productModel.startSession();
    session.startTransaction();
    try {
      const findProduct = await this.productModel.findOne({ name: createProductInput.name });
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
      } else {
        const subcategory = await this.subcategoryModel.findById(createProductInput.subcategory);
        subcategory.products.push(product._id);
        await subcategory.save();
      }
      if (createProductInput.brand === '') {
        product.brand = null;
      } else {
        const brand = await this.brandModel.findById(createProductInput.brand);
        brand.products.push(product._id);
        await brand.save();
      }
      if (createProductInput.category === '') {
        product.category = null;
      } else {
        const category = await this.categoryModel.findById(createProductInput.category);
        category.products.push(product._id);
        await category.save();
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
  async findDescount(filter: string) {
    try {
      if (filter === '') {
        const products = await this.productModel.find().populate('brand');
        const productsFiltered = products
          .filter((e) => e.referencePrice && e.referencePrice !== null)
          .sort((a, b) => {
            const priceA = ((a.referencePrice - a.sellingPrice) / a.referencePrice) * 100;
            const priceB = ((b.referencePrice - b.sellingPrice) / b.referencePrice) * 100;
            return priceB - priceA;
          });
        return productsFiltered;
      } else {
        const products = await this.productModel.find().populate('brand');
        const productsFiltered = products
          .filter((e) => e.referencePrice && e.referencePrice !== null)
          .sort((a, b) => {
            const priceA = ((a.referencePrice - a.sellingPrice) / a.referencePrice) * 100;
            const priceB = ((b.referencePrice - b.sellingPrice) / b.referencePrice) * 100;
            return priceB - priceA;
          })
          .splice(0, 8);

        return productsFiltered;
      }
    } catch (error) {
      return error;
    }
  }
  async findMoreSales() {
    try {
      const products = await this.productModel.find().populate('brand');
      const productsFiltered = products
        .sort((a, b) => {
          return b.salesNumber - a.salesNumber;
        })
        .splice(0, 8);

      return productsFiltered;
    } catch (error) {}
  }
  async filters(filter: Filters) {
    try {
      const filterQuery: IFilterProducts = {};
      let arrayFilters: Product[] = [];
      if (filter.name) {
        filterQuery.name = { $regex: filter.name, $options: 'i' };
      }
      const products = await this.productModel
        .find(filterQuery)
        .populate('category')
        .populate('brand');
      if (filter.category) {
        if (arrayFilters.length > 0) {
          for (let i = 0; i < arrayFilters.length; i++) {
            if (arrayFilters[i].category.name === filter.category) {
              arrayFilters.push(arrayFilters[i]);
            }
          }
        } else {
          for (let i = 0; i < products.length; i++) {
            if (products[i].category.name === filter.category) {
              arrayFilters.push(products[i]);
            }
          }
        }
      }
      if (filter.brand) {
        if (arrayFilters.length > 0) {
          for (let i = 0; i < arrayFilters.length; i++) {
            if (arrayFilters[i].brand.name === filter.brand) {
              arrayFilters.push(arrayFilters[i]);
            }
          }
        } else {
          for (let i = 0; i < products.length; i++) {
            if (products[i].brand.name === filter.brand) {
              arrayFilters.push(products[i]);
            }
          }
        }
      }
      if (filter.sellingPrice || filter.salesNumber) {
        if (arrayFilters.length > 0) {
          if (filter.sellingPrice === 'Menor Precio' && filter.salesNumber === 'Menores Ventas') {
            arrayFilters.sort((a, b) => a.sellingPrice - b.sellingPrice);
          }
        }
      }
      if (filter.sellingPrice || filter.salesNumber) {
        if (arrayFilters.length > 0) {
          arrayFilters.sort((a, b) => {
            let comparison = 0;

            if (filter.sellingPrice) {
              const sellingPriceOrder = filter.sellingPrice === 'Menor Precio' ? 1 : -1;
              comparison = sellingPriceOrder * (a.sellingPrice - b.sellingPrice);
              if (comparison !== 0) return comparison;
            }

            if (filter.salesNumber) {
              const salesNumberOrder = filter.salesNumber === 'Menores Ventas' ? 1 : -1;
              comparison = salesNumberOrder * (a.salesNumber - b.salesNumber);
              if (comparison !== 0) return comparison;
            }

            return comparison;
          });
        } else {
          arrayFilters = products;
          arrayFilters.sort((a, b) => {
            let comparison = 0;

            if (filter.sellingPrice) {
              const sellingPriceOrder = filter.sellingPrice === 'Menor Precio' ? 1 : -1;
              comparison = sellingPriceOrder * (a.sellingPrice - b.sellingPrice);
              if (comparison !== 0) return comparison;
            }

            if (filter.salesNumber) {
              const salesNumberOrder = filter.salesNumber === 'Menores Ventas' ? 1 : -1;
              comparison = salesNumberOrder * (a.salesNumber - b.salesNumber);
              if (comparison !== 0) return comparison;
            }

            return comparison;
          });
        }
      }
      if (arrayFilters.length === 0) {
        arrayFilters = products;
      }
      return arrayFilters;
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
  async update(file: any, filesCompare: string[], updateProduct: UpdateProductInput, files: any) {
    try {
      let dataUpdate = {};
      const findProduct = await this.productModel.findById(updateProduct._id);
      if (!findProduct) {
        throw new Error('El producto no existe');
      }

      if (file) {
        const verify = await verifyImage(file.filename.replace(/\.[^.]*$/, ''));
        if (verify) {
          throw new Error(
            `la imagen ${file.filename.replace(/\.[^.]*$/, '')} ya existe en el servidor`
          );
        }
        deleteImageFromGCS(findProduct.picture);
        const image = await uploadImage(file, file.filename.replace(/\.[^.]*$/, ''));
        dataUpdate = {
          ...dataUpdate,
          picture: image,
        };
      }

      if (files !== null && files.length > 0) {
        const images: string[] = filesCompare;
        const deleteImage = findProduct.extraPicture.filter((image) => !images.includes(image));
        if (deleteImage.length > 0) {
          deleteImage.forEach(async (image) => {
            const deleteImage = deleteImageFromGCS(image);
            if (!deleteImage) {
              throw new Error('la imagen secundaria no pudo ser eliminada');
            }
          });
        }
        for (let i = 0; i < files.length; i++) {
          const verify = await verifyImage(files[i].filename.replace(/\.[^.]*$/, ''));
          if (verify) {
            throw new Error(
              `la imagen ${files[i].filename.replace(/\.[^.]*$/, '')} ya existe en el servidor`
            );
          }
          const image = await uploadImage(files[i], files[i].filename.replace(/\.[^.]*$/, ''));
          images.push(image);
        }
        dataUpdate = {
          ...dataUpdate,
          extraPicture: images,
        };
      }

      if (findProduct.name !== updateProduct.name) {
        const verifyName = await this.productModel.findOne({ name: updateProduct.name });
        if (verifyName) {
          throw new Error('El nombre ya existe');
        }
        dataUpdate = {
          ...dataUpdate,
          name: updateProduct.name,
        };
      }
      if (findProduct.description !== updateProduct.description) {
        dataUpdate = {
          ...dataUpdate,
          description: updateProduct.description,
        };
      }

      if (findProduct.purchasePrice !== updateProduct.purchasePrice) {
        dataUpdate = {
          ...dataUpdate,
          purchasePrice: updateProduct.purchasePrice,
        };
      }
      if (findProduct.sellingPrice !== updateProduct.sellingPrice) {
        dataUpdate = {
          ...dataUpdate,
          sellingPrice: updateProduct.sellingPrice,
        };
      }
      if (findProduct.referencePrice !== updateProduct.referencePrice) {
        dataUpdate = {
          ...dataUpdate,
          referencePrice: updateProduct.referencePrice,
        };
      }

      if (updateProduct.subcategory === '') {
        throw new Error('La subcategoría no puede estar vacía');
      }
      if (updateProduct.brand === '') {
        throw new Error('La marca no puede estar vacía');
      }
      if (updateProduct.category === '') {
        throw new Error('La categoría no puede estar vacía');
      }
      if (updateProduct.subcategory !== findProduct.subcategory.toString()) {
        const deleteProductSubCategory = await this.subcategoryModel.findById(
          findProduct.subcategory
        );
        const productsSubcategory = deleteProductSubCategory.products.filter(
          (e) => e.toString() !== findProduct._id.toString()
        );
        deleteProductSubCategory.products = productsSubcategory;
        await deleteProductSubCategory.save();
        const newProductSubCategory = await this.subcategoryModel.findById(
          updateProduct.subcategory
        );
        newProductSubCategory.products.push(findProduct._id);
        await newProductSubCategory.save();
        dataUpdate = {
          ...dataUpdate,
          subcategory: updateProduct.subcategory,
        };
      }

      if (updateProduct.brand !== findProduct.brand.toString()) {
        const deleteProductBrand = await this.brandModel.findById(findProduct.brand);
        const productsBrand = deleteProductBrand.products.filter(
          (e) => e.toString() !== findProduct._id.toString()
        );
        deleteProductBrand.products = productsBrand;
        await deleteProductBrand.save();
        const newProductBrand = await this.brandModel.findById(updateProduct.brand);
        newProductBrand.products.push(findProduct._id);
        await newProductBrand.save();
        dataUpdate = {
          ...dataUpdate,
          brand: updateProduct.brand,
        };
      }

      if (updateProduct.category !== findProduct.category.toString()) {
        const deleteProductCategory = await this.categoryModel.findById(findProduct.category);
        const productsCategory = deleteProductCategory.products.filter(
          (e) => e.toString() !== findProduct._id.toString()
        );
        deleteProductCategory.products = productsCategory;
        await deleteProductCategory.save();
        const newProductCategory = await this.categoryModel.findById(updateProduct.category);
        newProductCategory.products.push(findProduct._id);
        await newProductCategory.save();
        dataUpdate = {
          ...dataUpdate,
          category: updateProduct.category,
        };
      }
      return await this.productModel.findByIdAndUpdate(updateProduct._id, {
        ...dataUpdate,
      });
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
      const deleteSub = await this.subcategoryModel.findById(product.subcategory);
      const deleteBrand = await this.brandModel.findById(product.brand);
      const deleteCategory = await this.categoryModel.findById(product.category);
      deleteSub.products = deleteSub.products.filter(
        (e) => e.toString() !== product._id.toString()
      );
      deleteBrand.products = deleteBrand.products.filter(
        (e) => e.toString() !== product._id.toString()
      );
      deleteCategory.products = deleteCategory.products.filter(
        (e) => e.toString() !== product._id.toString()
      );
      await deleteSub.save();
      await deleteBrand.save();
      await deleteCategory.save();
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  }
}
