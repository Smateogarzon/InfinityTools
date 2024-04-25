import { IsEnum } from 'class-validator';
import { UserGender } from '../enums/user.enums';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  firtsName: string;

  @Field({ nullable: true })
  MiddleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  MiddleLastName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => UserGender, { nullable: true })
  @IsEnum(UserGender)
  gender: UserGender;
}
