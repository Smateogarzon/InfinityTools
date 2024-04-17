import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
@ObjectType()
export class Brand {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  products: string[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
