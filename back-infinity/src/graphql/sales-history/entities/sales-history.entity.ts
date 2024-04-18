import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsDate, IsString, IsNumber, IsArray, IsPositive } from 'class-validator';

export type SalesHistoryDocument = HydratedDocument<SalesHistory>;

@Schema()
@ObjectType()
export class SalesHistory {
  @Prop()
  @Field(() => Date)
  @IsDate()
  date: Date;

  @Prop()
  @Field()
  @IsString({ each: true })
  @IsArray()
  products: string[];

  @Prop()
  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  total: number;

  @Prop()
  @Field()
  @IsString()
  status: string;
}

export const SalesHistorySchema = SchemaFactory.createForClass(SalesHistory);
