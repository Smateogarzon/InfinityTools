import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  name: string;

  @Field(() => [String])
  use: string[];
}
