import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LocationService } from '../location/location.service';
import { CreateLocationInput } from '../location/dto/create-location.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private locationService: LocationService
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = new this.userModel(createUserInput);
    return user.save();
  }

  async createUserLocation(create: CreateLocationInput) {
    const createdLocation = await this.locationService.create(create);
    await this.userModel.findByIdAndUpdate(create.userId, {
      $set: { location: createdLocation._id },
    });
    const user = await this.userModel.findById(create.userId).populate('location');
    console.log('🚀 ~ UsersService ~ createUserLocation ~ user:', user);
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    console.log('🚀 ~ UsersService ~ update ~ updateUserInput:', updateUserInput);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
