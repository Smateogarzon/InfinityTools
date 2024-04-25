import { Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(@InjectModel('Location') private locationModel: Model<Location>) {}
  async create(createLocationInput: CreateLocationInput) {
    const session = await this.locationModel.startSession();
    session.startTransaction();
    try {
      const createdLocation = new this.locationModel(createLocationInput);
      session.commitTransaction();
      return await createdLocation.save();
    } catch (error) {
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationInput: UpdateLocationInput) {
    return `This action updates a #${id} location ${updateLocationInput.id}`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
