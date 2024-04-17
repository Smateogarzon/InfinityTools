import { ObjectType, Field } from '@nestjs/graphql';
import { ObjectId, ObjectIdColumn, Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => String)
  _id: ObjectId;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;
}
