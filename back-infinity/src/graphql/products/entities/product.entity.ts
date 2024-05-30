import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsString, IsNumber, IsPositive, IsArray, IsUrl, IsBoolean } from 'class-validator';
import { Category } from '@/graphql/category/entities/category.entity';
import { Subcategory } from '@/graphql/category/entities/subcategory.entity';
import { Brand } from '@/graphql/brands/entities/brand.entity';
export interface Description {
  [key: string]: string;
}
export interface NestedDescription {
  [key: string]: Description;
}

export type ProductDocument = HydratedDocument<Product>;

@Schema()
@ObjectType()
export class Product {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field()
  @IsString()
  name: string;

  @Prop()
  @Field(() => String)
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
  @Field(() => Float, { nullable: true })
  @IsNumber({ allowInfinity: false })
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

  @Prop({
    type: mongoose.Schema.Types.ObjectId || null,
    ref: 'Category',
    default: null,
    nullable: true,
  })
  @Field(() => Category, { nullable: true })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId || null,
    ref: 'Subcategory',
    default: null,
    nullable: true,
  })
  @Field(() => Subcategory, { nullable: true })
  subcategory: Subcategory;

  @Prop()
  @Field(() => String)
  @IsUrl()
  picture: string;

  @Prop()
  @Field(() => [String])
  extraPicture: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId || null,
    ref: 'Brand',
    default: null,
    nullable: true,
  })
  @Field(() => Brand, { nullable: true })
  @IsString()
  brand: Brand;

  @Prop()
  @Field(() => [String])
  @IsString({ each: true })
  @IsArray()
  reviews: string[];

  @Prop({ default: 0 })
  @Field(() => Int, { nullable: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  salesNumber: number;

  @Prop({ default: true })
  @Field(() => Boolean)
  @IsBoolean()
  status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
