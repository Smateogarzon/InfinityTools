import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateLocationInput } from '../location/dto/create-location.input';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'FindAllusers' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'FindOneuser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => [User], { name: 'FindUserQuery' })
  findUsers(@Args('filter') filter: FindUserInput) {
    return this.usersService.findUsers(filter);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  createUserLocation(@Args('create') create: CreateLocationInput) {
    return this.usersService.createUserLocation(create);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Query(() => User, { name: 'LogIn' })
  async logIn(
    @Args('email') email: string,
    @Args('password') password: string,
    @Res() res: Response
  ) {
    try {
      const user = await this.usersService.logIn(email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
