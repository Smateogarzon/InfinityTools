import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatus } from '../enums/orders.enums';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
@ObjectType()
export class Order {
  @Prop({ default: OrderStatus.PENDING })
  @Field(() => OrderStatus, { defaultValue: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop()
  @Field()
  total: number;

  @Prop()
  @Field()
  date: Date;

  @Prop()
  @Field()
  userId: string;

  @Prop()
  @Field()
  products: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
