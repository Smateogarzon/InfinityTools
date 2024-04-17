import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  tel: string;

  @Field(() => Int)
  zipCode: number;

  @Field()
  firtsName: string;

  @Field()
  lastName: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  userId!: string;
}
