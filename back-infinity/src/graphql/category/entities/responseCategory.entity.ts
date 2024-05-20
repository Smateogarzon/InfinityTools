import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseCategory {
  @Field(() => String)
  nameCategory: string;
  @Field(() => [String])
  subcategories: string[];
}
