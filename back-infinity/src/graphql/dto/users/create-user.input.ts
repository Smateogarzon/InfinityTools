import { InputType, Field } from '@nestjs/graphql';
import { Rol } from '@/graphql/enums/user.enum';
import { Matches } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => Rol, { nullable: true, defaultValue: Rol.USER })
  rol: Rol;
  @Field()
  gender: 'male' | 'female' | 'other';
  @Field()
  suscriber: boolean;
  @Field()
  status: 'active' | 'inactive';
  @Field({ nullable: true })
  image?: string;
}

@InputType()
export class CreateUserLocationInput {
  @Field(() => String)
  @Matches(/^\+/, { message: 'Numero de telefono invalido' })
  tel: string;

  @Field(() => Number)
  zipCode: number;

  @Field(() => String)
  firtsName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String, { nullable: true }) // Specify String type for user IDs
  use?: string; // Change type to string
}
