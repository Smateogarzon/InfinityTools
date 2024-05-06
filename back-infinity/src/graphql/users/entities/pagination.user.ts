import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class PaginationUser {
  @Field(() => [User], { nullable: true })
  users: User[];
  @Field(() => Int, { nullable: true })
  total: number;
}
