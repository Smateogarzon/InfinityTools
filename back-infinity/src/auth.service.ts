import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/graphql/users/entities/user.entity';

interface IAuth {
  email: string;
  familyName?: string;
  photo?: string;
}
interface IAuthFacebook {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

@Injectable()
export class Auth {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async ValidateUser(createUser: IAuth) {
    const session = await this.userModel.startSession();
    session.startTransaction();

    try {
      let user = await this.userModel.findOne({ email: createUser.email });

      if (!user) {
        user = new this.userModel(createUser);
        user.email = createUser.email;
        user.firtsName = createUser.familyName;
        user.picture = createUser.photo;
        user.completeName = `${createUser.familyName}`;
        await user.save();
      } else {
        if (user.rol === 'USER') {
          await session.commitTransaction();
          return { user, userExist: true };
        }
        throw new Error('logueate por inicio de sesion mayorista');
      }
      if (user.rol === 'USER') {
        await session.commitTransaction();
        return { user, userExist: false };
      } else {
        throw new Error('logueate por inicio de sesion mayorista');
      }
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async ValidateUserFacebook(createUser: IAuthFacebook) {
    const session = await this.userModel.startSession();
    session.startTransaction();

    let user = await this.userModel.findOne({ email: createUser.email });
    try {
      if (!user) {
        user = new this.userModel(createUser);
        user.email = createUser.email;
        user.firtsName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.picture = createUser.picture;
        await user.save();
      }

      await session.commitTransaction();

      return user;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
