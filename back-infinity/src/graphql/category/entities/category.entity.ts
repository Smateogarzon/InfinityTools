import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
@ObjectType()
export class Category {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  products: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
