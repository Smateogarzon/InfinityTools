import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsCartDocument = HydratedDocument<ProductsCart>;

@Schema()
@ObjectType()
export class ProductsCart {
  @Prop()
  @Field()
  user: string;

  @Prop()
  @Field()
  products: string[];

  @Prop()
  @Field(() => Date)
  date: Date;

  @Prop()
  @Field()
  status: string;

  @Prop()
  @Field()
  total: number;

  @Prop()
  @Field()
  sendVideo: boolean;
}

export const ProductsCartSchema = SchemaFactory.createForClass(ProductsCart);
