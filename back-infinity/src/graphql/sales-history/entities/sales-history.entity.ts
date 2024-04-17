import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SalesHistoryDocument = HydratedDocument<SalesHistory>;

@Schema()
@ObjectType()
export class SalesHistory {
  @Prop()
  @Field(() => Date)
  date: Date;

  @Prop()
  @Field()
  products: string[];

  @Prop()
  @Field(() => Int)
  total: number;

  @Prop()
  @Field()
  status: string;
}

export const SalesHistorySchema = SchemaFactory.createForClass(SalesHistory);
