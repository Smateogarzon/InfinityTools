import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/graphql/users/entities/user.entity';

interface IAuth {
  email: string;
  familyName?: string;
  photo?: string;
}

@Injectable()
export class Auth {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async ValidateUser(createUser: IAuth) {
    const user = await this.userModel.findOne({ email: createUser.email });

    if (!user) {
      const newUser = new this.userModel(createUser);
      newUser.email = createUser.email;
      newUser.firtsName = createUser.familyName;
      newUser.picture = createUser.photo;
      return newUser.save();
    }
    return user;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }
}
