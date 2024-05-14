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

  async findAllCategories() {
    try {
      return await this.categoryModel.find();
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async create(createCategoryInput: CreateCategoryInput) {
    try {
      const searchCategory = await this.categoryModel.findOne({
        name: createCategoryInput.name.toLowerCase(),
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

  async remove(id: string) {
    try {
      return await this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
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

  async findAllSubCategories(categoryId: string) {
    try {
      return await this.subcategoryModel.find({ category: categoryId });
    } catch (error) {
      return error;
    }
  }

  async removeSubCategory(id: string, categoryId: string) {
    try {
      const findCategory = await this.categoryModel.findOne({ _id: categoryId });

      if (findCategory.subcategory.includes(id)) {
        findCategory.subcategory.splice(findCategory.subcategory.indexOf(id), 1);
        await findCategory.save();
      }
      return await this.subcategoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
