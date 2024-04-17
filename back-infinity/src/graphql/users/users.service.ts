import { Injectable } from '@nestjs/common';
import { CreateUserLocationInput, CreateUserInput } from '../dto/users/create-user.input';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Location } from '../entities/location.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Location) private locationRepository: Repository<Location>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(_id: ObjectId): Promise<User> {
    return this.userRepository.findOneBy({ _id });
  }

  createUser(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  async UpdateUserLocation(UpdateUserLocation: CreateUserLocationInput) {
    const { use } = UpdateUserLocation;
    const user = await this.userRepository.findOneBy({ _id: new ObjectId(use) });
    if (!user) {
      throw new Error('User not found');
    } else {
      const location = await this.userRepository.update(
        { _id: new ObjectId(use) },
        { userlocation: UpdateUserLocation }
      );
      return location;
    }
  }
}
