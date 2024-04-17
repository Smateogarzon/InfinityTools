import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
@ObjectType()
export class Product {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field(() => Float)
  purchasePrice: number;

  @Prop()
  @Field(() => Float)
  sellingPrice: number;

  @Prop()
  @Field(() => Float)
  referencePrice: number;

  @Prop()
  @Field(() => Float)
  distributorPrice: number;

  @Prop()
  @Field(() => Float)
  referencePriceDistributor: number;

  @Prop()
  @Field(() => [String])
  category: string[];

  @Prop()
  @Field()
  picture: string;

  @Prop()
  @Field(() => Int)
  stock: number;

  @Prop()
  @Field()
  brand: string;

  @Prop()
  @Field(() => [String])
  shoppingCart: string[];

  @Prop()
  @Field(() => [String])
  reviews: string[];

  @Prop()
  @Field(() => Int)
  salesNumber: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
