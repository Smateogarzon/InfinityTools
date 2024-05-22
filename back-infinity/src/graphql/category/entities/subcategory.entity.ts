import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<Subcategory>;
@Schema()
@ObjectType()
export class Subcategory {
  @Field(() => String)
  _id: string;
  @Prop()
  @Field()
  @IsString()
  name: string;

  @Prop()
  @Field(() => String)
  category: string;

  @Prop()
  @Field(() => [String])
  @IsArray()
  products: string[];
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
