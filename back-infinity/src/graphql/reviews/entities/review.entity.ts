import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
@ObjectType()
export class Review {
  @Prop()
  @Field()
  @IsString()
  product: string;

  @Prop()
  @Field()
  @IsString()
  text: string;

  @Prop()
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  @Max(5)
  score: number;

  @Prop()
  @Field()
  user: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
