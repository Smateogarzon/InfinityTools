import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LocationService } from '../location/location.service';
import { CreateLocationInput } from '../location/dto/create-location.input';
import { IQuery } from './enums/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private locationService: LocationService
  ) {}

  async findAll() {
    try {
      const users = await this.userModel.find().populate('location');
      return users;
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
      let query: IQuery = {};
      if (filter.name) {
        query.completeName = { $regex: filter.name.trim(), $options: 'i' };
      }
      if (filter.status) {
        query.status = filter.status;
      }
      if (filter.rol) {
        query.rol = filter.rol;
      }
      if (filter.gender) {
        query.gender = filter.gender;
      }
      if (filter.city) {
        const useres = await this.userModel.find(query).populate('location');
        const filterCity = useres.filter(
          (user) => user.location?.city && user.location?.city === filter.city
        );
        return filterCity;
      }
      if (filter.register) {
        const dateOrder =
          filter.register === 'Ascendente'
            ? await this.userModel.find(query).populate('location').sort({ date: 1 })
            : await this.userModel.find(query).populate('location').sort({ date: -1 });
        return dateOrder;
      }

      const useres = await this.userModel.find(query).populate('location');
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
        const password = await bcrypt.hash(createUserInput.password, 11);
        createUserInput.password = password;
      }
      if (!createUserInput.picture) {
        createUserInput.picture = 'https://storage.googleapis.com/pictures_infinity/perfil.png';
      }
      const user = new this.userModel(createUserInput);
      user.completeName = `${createUserInput.firtsName} ${createUserInput.MiddleName || ''} ${createUserInput.lastName || ''} ${createUserInput.MiddleLastName || ''}`;
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
