import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserInput, CreateUserLocationInput } from '../dto/users/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }
  @Mutation(() => User, { name: 'UpdateUserLocation' })
  updateUserLocation(@Args('UpdateUserLocation') UpdateUserLocation: CreateUserLocationInput) {
    return this.usersService.UpdateUserLocation(UpdateUserLocation);
  }
}
