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
      let user = await this.userModel.findOne({ email: createUser.email }, { session });

      if (!user) {
        user = new this.userModel(createUser);
        user.email = createUser.email;
        user.firtsName = createUser.familyName;
        user.picture = createUser.photo;
        await user.save({ session });
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
