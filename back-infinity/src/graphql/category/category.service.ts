import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
    @InjectModel('Subcategory') private subcategoryModel: Model<Subcategory>
  ) {}

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async create(createCategoryInput: CreateCategoryInput) {
    try {
      const searchCategory = await this.categoryModel.findOne({
        name: createCategoryInput.name,
      });
      if (searchCategory) {
        throw new Error('La categoria ya existe');
      }
      const category = new this.categoryModel(createCategoryInput);
      category.name = createCategoryInput.name.toLowerCase();
      return category.save();
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    try {
      const category = await this.categoryModel.findOneAndUpdate({ _id: id }, updateCategoryInput);
      return category;
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async createSubCategory(createCategoryInput: CreateCategoryInput, categoryId: string) {
    try {
      const category = await this.categoryModel.findById(categoryId);
      if (!category.subcategory.includes(createCategoryInput.name)) {
        const subCategory = new this.subcategoryModel(createCategoryInput);
        subCategory.category = categoryId;
        subCategory.name = createCategoryInput.name.toLowerCase();
        const { _id } = await subCategory.save();
        category.subcategory.push(_id.toString());
        return await category.save();
      } else {
        throw new Error('La subcategoría ya existe en esta categoría');
      }
    } catch (error) {
      throw error;
    }
  }
}
