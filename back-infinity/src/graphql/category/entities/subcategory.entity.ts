import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<Subcategory>;
@Schema()
@ObjectType()
export class Subcategory {
  @Prop()
  @Field()
  @IsString()
  name: string;

  @Prop()
  @Field(() => String)
  category: String;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
