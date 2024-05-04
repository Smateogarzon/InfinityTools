import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  tel: string;

  @Field(() => Int)
  zipCode: number;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field({ nullable: true })
  userId!: string;
}
