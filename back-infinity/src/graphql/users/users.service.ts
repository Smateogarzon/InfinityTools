import * as bcrypt from 'bcrypt';
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

  async findAll() {
    try {
      return await this.userModel.find().populate('location');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).populate('location');
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUsers(filter: FindUserInput) {
    try {
      const useres = await this.userModel.find({ email: filter.name });
      if (!useres) throw new Error('Usuario no encontrado');
      return useres;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserInput: CreateUserInput) {
    const session = await this.userModel.startSession();
    session.startTransaction();
    try {
      const findUser = await this.userModel.findOne({ email: createUserInput.email });

      if (findUser) {
        throw new Error('El usuario ya existe');
      }

      if (createUserInput.password) {
        console.log(
          '🚀 ~ UsersService ~ create ~ createUserInput.password:',
          createUserInput.password
        );

        const password = await bcrypt.hash(createUserInput.password, 11);

        console.log('🚀 ~ UsersService ~ create ~ password:', password);
        createUserInput.password = password;
      }
      //carga de imagen de perfil

      const user = new this.userModel(createUserInput);
      await user.save();
      await session.commitTransaction();
      return user;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async createUserLocation(create: CreateLocationInput) {
    const session = await this.userModel.startSession();
    session.startTransaction();
    try {
      const findLocation = await this.userModel.findById(create.userId);
      if (findLocation.location) {
        throw new Error('El usuario ya tiene una ubicacion por Favor actualice su ubicacion');
      }
      const createdLocation = await this.locationService.create(create);
      const user = await this.userModel.findByIdAndUpdate(create.userId, {
        $set: { location: createdLocation._id },
      });
      session.commitTransaction();
      return user;
    } catch (error) {
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const session = await this.userModel.startSession();
    session.startTransaction();
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserInput);
      session.commitTransaction();
      return user;
    } catch (error) {
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  remove(id: string) {
    try {
      return this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async logIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Contraseña incorrecta');
    }
    return user;
  }
}
