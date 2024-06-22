import { Injectable } from '@nestjs/common';
import { CreateBannerInput } from './dto/create-banner.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './entities/banner.entity';
import uploadImage, { verifyImage } from '@/services/uploadimage.service';
import deleteImageFromGCS from '@/services/deleteImage.service';

@Injectable()
export class BannersService {
  constructor(@InjectModel('Banner') private bannerModel: Model<Banner>) {}
  async create(createBannerInput: CreateBannerInput, file: any) {
    try {
      const findImg = await this.bannerModel.findOne({
        name: createBannerInput.name.toLowerCase(),
      });

      if (findImg) {
        throw new Error('ese nombre ya existe');
      }
      const verify = await verifyImage(file.filename.replace(/\.[^.]*$/, ''));
      if (verify) {
        throw new Error(
          `la imagen ${file.filename.replace(/\.[^.]*$/, '')} ya existe en el servidor`
        );
      }
      const image = await uploadImage(file, file.filename.replace(/\.[^.]*$/, ''));
      const banner = new this.bannerModel();
      banner.name = createBannerInput.name.toLocaleLowerCase();
      banner.picture = image;
      return await banner.save();
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.bannerModel.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(search: string) {
    try {
      const banner = await this.bannerModel.find({ label: search });
      if (banner.length === 0) return [];
      return banner;
    } catch (error) {
      return error;
    }
  }

  async update(updateBannerInput: CreateBannerInput) {
    try {
      if (updateBannerInput.only) {
        const banner = await this.bannerModel.find({ label: updateBannerInput.label });
        if (banner.length > 1) {
          for (const ban of banner) {
            await this.bannerModel.findOneAndUpdate(
              { name: ban.name },
              { $pull: { label: updateBannerInput.label } }
            );
          }
        } else {
          await this.bannerModel.findOneAndUpdate(
            {
              label: updateBannerInput.label,
            },
            { $pull: { label: updateBannerInput.label } }
          );
        }
        return await this.bannerModel.findOneAndUpdate(
          { name: updateBannerInput.name },
          { $push: { label: updateBannerInput.label } }
        );
      } else {
        return await this.bannerModel.findOneAndUpdate(
          { name: updateBannerInput.name },
          { $push: { label: updateBannerInput.label } }
        );
      }
    } catch (error) {
      return error;
    }
  }

  async remove(object: CreateBannerInput) {
    try {
      return await this.bannerModel.findOneAndUpdate(
        { name: object.name },
        { $pull: { label: object.label } }
      );
    } catch (error) {
      return error;
    }
  }

  async delete(del: CreateBannerInput) {
    try {
      const banner = await this.bannerModel.findOne({ name: del.name });
      if (!banner) throw new Error('no se encontro el banner');
      const deleteImage = deleteImageFromGCS(banner.picture);
      if (!deleteImage) {
        throw new Error('la imagen secundaria no pudo ser eliminada');
      }
      const deleteBanner = await this.bannerModel.findOneAndDelete(
        { name: del.name },
        { new: true }
      );
      return deleteBanner;
    } catch (error) {
      return error;
    }
  }
}
