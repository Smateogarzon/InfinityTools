import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsArray, IsOptional, IsString } from 'class-validator';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
@ObjectType()
export class Brand {
  @Field(() => String)
  _id: string;
  @Prop()
  @IsString()
  @Field()
  name: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  products: string[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
