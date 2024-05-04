import { InputType, Field } from '@nestjs/graphql';
import { UserGender, UserRol, UserStatus } from '../enums/user.enums';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  firtsName: string;

  @Field({ nullable: true })
  MiddleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  MiddleLastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => UserGender, { nullable: true })
  gender: UserGender;

  @Field({ nullable: true })
  suscribe: boolean;

  @Field({ nullable: true })
  picture: string;

  @Field(() => UserRol, { nullable: true })
  rol: UserRol;

  @Field(() => UserStatus, { nullable: true }) //quitar
  status: UserStatus;
}

@InputType()
export class FindUserInput {
  @Field({ nullable: true })
  name: string;
  @Field(() => UserStatus, { nullable: true })
  status: UserStatus;
  @Field(() => String, { nullable: true })
  register: 'Ascendente' | 'Descendente';
  @Field(() => UserRol, { nullable: true })
  rol: UserRol;
  @Field(() => UserGender, { nullable: true })
  gender: UserGender;
  @Field({ nullable: true })
  city: string;
}
