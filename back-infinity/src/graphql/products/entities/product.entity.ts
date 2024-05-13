import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsString, IsNumber, IsPositive, IsArray, IsUrl, IsBoolean } from 'class-validator';
import { Category } from '@/graphql/category/entities/category.entity';
import { Subcategory } from '@/graphql/category/entities/subcategory.entity';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @Field(() => Category)
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' })
  @Field(() => Subcategory)
  subcategory: Subcategory;

  @Prop()
  @Field(() => String)
  @IsUrl()
  picture: string;

  @Prop()
  @Field()
  @IsString()
  brand: string;

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

  @Prop({ default: true })
  @Field(() => Boolean)
  @IsBoolean()
  status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
