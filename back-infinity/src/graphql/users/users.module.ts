import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Location } from '../entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Location])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
