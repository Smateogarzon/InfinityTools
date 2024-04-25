import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSchema } from './entities/user.entity';
import { LocationSchema } from '../location/entities/location.entity';
import { LocationService } from '../location/location.service';
import { JwtServices } from '@/services/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Location', schema: LocationSchema },
    ]),
  ],
  providers: [UsersResolver, UsersService, LocationService, JwtServices],
})
export class UsersModule {}
