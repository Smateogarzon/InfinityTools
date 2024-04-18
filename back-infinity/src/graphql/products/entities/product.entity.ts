import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString, IsNumber, IsPositive, IsArray, IsUrl } from 'class-validator';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
@ObjectType()
export class Product {
  @Prop()
  @Field()
  @IsString()
  name: string;

  @Prop()
  @Field()
  @IsString()
  description: string;

  @Prop()
  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  purchasePrice: number;

  @Prop()
  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  sellingPrice: number;

  @Prop()
  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  referencePrice: number;

  @Prop()
  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  distributorPrice: number;

  @Prop()
  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  referencePriceDistributor: number;

  @Prop()
  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  category: string[];

  @Prop()
  @Field()
  @IsUrl()
  picture: string;

  @Prop()
  @Field(() => Int)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  stock: number;

  @Prop()
  @Field()
  @IsString()
  brand: string;

  @Prop()
  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  shoppingCart: string[];

  @Prop()
  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  reviews: string[];

  @Prop()
  @Field(() => Int)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  salesNumber: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
