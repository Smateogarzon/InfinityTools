import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateLocationInput } from './create-location.input';

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {
  @Field(() => Int)
  id: number;
}
