import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
@ObjectType()
export class Review {
  @Prop()
  @Field()
  product: string;

  @Prop()
  @Field()
  text: string;

  @Prop()
  @Field(() => Int)
  score: number;

  @Prop()
  @Field()
  user: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
