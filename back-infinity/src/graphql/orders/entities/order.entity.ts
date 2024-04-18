import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatus } from '../enums/orders.enums';
import { IsNumber, IsPositive, IsDate, IsString, IsArray, IsEnum } from 'class-validator';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
@ObjectType()
export class Order {
  @Prop({ default: OrderStatus.PENDING })
  @Field(() => OrderStatus, { defaultValue: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @Prop()
  @Field()
  @IsNumber()
  @IsPositive()
  total: number;

  @Prop()
  @Field()
  @IsDate()
  date: Date;

  @Prop()
  @Field()
  userId: string;

  @Prop()
  @Field()
  @IsString({ each: true })
  @IsArray()
  products: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
