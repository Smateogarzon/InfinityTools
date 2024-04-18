import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString, IsDate, IsBoolean, IsNumber, IsArray, IsPositive } from 'class-validator';

export type ProductsCartDocument = HydratedDocument<ProductsCart>;

@Schema()
@ObjectType()
export class ProductsCart {
  @Prop()
  @Field()
  @IsString()
  user: string;

  @Prop()
  @Field()
  @IsString({ each: true })
  @IsArray()
  products: string[];

  @Prop()
  @Field(() => Date)
  @IsDate()
  date: Date;

  @Prop()
  @Field()
  @IsString()
  status: string;

  @Prop()
  @Field()
  @IsNumber()
  @IsPositive()
  total: number;

  @Prop()
  @Field()
  @IsBoolean()
  sendVideo: boolean;
}

export const ProductsCartSchema = SchemaFactory.createForClass(ProductsCart);
