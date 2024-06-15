import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsString, IsDate, IsBoolean, IsNumber, IsArray, IsPositive } from 'class-validator';
import { ProductCart } from './shopping-cart.entity';
import { User } from '@/graphql/users/entities/user.entity';

export type ProductsCartDocument = HydratedDocument<ProductsCart>;

@Schema()
@ObjectType()
export class ProductsCart {
  @Field({ nullable: true })
  _id: string;

  @Prop({ default: false })
  @Field({ nullable: true })
  delited: boolean;

  @Prop({ default: 0 })
  @Field({ nullable: true })
  totalItems: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId || null,
    ref: 'User',
    default: null,
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  user: User;

  @Prop()
  @Field(() => [ProductCart], { nullable: true })
  @IsArray()
  products: ProductCart[];

  @Prop({ default: new Date() })
  @Field(() => Date)
  @IsDate()
  date: Date;

  @Prop({ default: false })
  @Field(() => Boolean)
  @IsString()
  status: boolean;

  @Prop()
  @Field({ nullable: true })
  @IsNumber()
  @IsPositive()
  total: number;

  @Prop({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  sendVideo: boolean;
}

export const ProductsCartSchema = SchemaFactory.createForClass(ProductsCart);
