import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
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
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
