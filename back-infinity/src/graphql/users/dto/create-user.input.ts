import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
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

  @Field({ nullable: true })
  gender: string;
}

@InputType()
export class FindUserInput {
  @Field({ nullable: true })
  name: string;
}
