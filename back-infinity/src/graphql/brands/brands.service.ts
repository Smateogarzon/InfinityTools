import { Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './entities/brand.entity';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel('Brand') private brandModel: Model<Brand>) {}

  async findAll() {
    try {
      return await this.brandModel.find();
    } catch (error) {
      throw error;
    }
  }

  async create(createBrandInput: CreateBrandInput) {
    const searchBrand = await this.brandModel.findOne({
      name: createBrandInput.name,
    });
    if (searchBrand) {
      throw new Error('La marca ya existe');
    }
    const brand = new this.brandModel(createBrandInput);
    brand.name = createBrandInput.name.toLowerCase();
    return brand.save();
  }

  async update(id: string, updateBrandInput: UpdateBrandInput) {
    try {
      const brand = await this.brandModel.findOneAndUpdate({ _id: id }, updateBrandInput);
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.brandModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
