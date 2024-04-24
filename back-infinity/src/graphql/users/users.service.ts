import byCript from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
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

  findAll() {
    return this.userModel.find().populate('location');
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).populate('location');
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  async findUsers(filter: FindUserInput) {
    const useres = await this.userModel.find({ email: filter.name });
    if (!useres) throw new Error('Usuario no encontrado');
    return useres;
  }

  create(createUserInput: CreateUserInput) {
    const findUser = this.userModel.findOne({ email: createUserInput.email });
    if (findUser) {
      throw new Error('El usuario ya existe');
    }

    if (createUserInput.password) {
      createUserInput.password = byCript.hashSync(createUserInput.password, 11);
    }
    //carga de imagen de perfil

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

  update(id: number, updateUserInput: UpdateUserInput) {
    console.log('🚀 ~ UsersService ~ update ~ updateUserInput:', updateUserInput);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async logIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    if (!byCript.compareSync(password, user.password)) {
      throw new Error('Contraseña incorrecta');
    }
    return user;
  }
}
