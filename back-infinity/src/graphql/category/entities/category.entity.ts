import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsArray, IsOptional, IsString } from 'class-validator';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
@ObjectType()
export class Category {
  @Prop()
  @Field()
  @IsString()
  name: string;

  @Prop()
  @Field(() => [String])
  subcategory: String[];

  @Prop()
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  products: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
