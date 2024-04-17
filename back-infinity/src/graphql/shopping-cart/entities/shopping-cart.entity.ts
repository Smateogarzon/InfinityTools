import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;

@Schema()
@ObjectType()
export class ShoppingCart {
  @Prop()
  @Field()
  productsCart: string;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
