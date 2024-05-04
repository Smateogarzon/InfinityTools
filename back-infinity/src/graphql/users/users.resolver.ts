import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateLocationInput } from '../location/dto/create-location.input';
import { Response } from 'express';
import { JwtServices } from '@/services/jwt.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly JwtServices: JwtServices
  ) {}

  @Query(() => [User], { name: 'FindAllusers' })
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Query(() => User, { name: 'FindOneuser' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => [User], { name: 'FindUserQuery' })
  async findUsers(@Args('filter') filter: FindUserInput) {
    try {
      const user = await this.usersService.findUsers(filter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.usersService.create(createUserInput);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => User)
  async createUserLocation(@Args('create') create: CreateLocationInput) {
    try {
      return await this.usersService.createUserLocation(create);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    try {
      return await this.usersService.update(id, updateUserInput);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => User, { name: 'LogIn' })
  async logIn(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response
  ) {
    try {
      const user = await this.usersService.logIn(email, password);
      const token = await this.JwtServices.generateToken(user.id);
      res.cookie('session', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3600000,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
