import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Location } from '@/graphql/entities/location.entity';
import { CreateUserLocationInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserLocationInput) {
  @Field(() => Location, { nullable: true })
  userlocation?: Location;
}
