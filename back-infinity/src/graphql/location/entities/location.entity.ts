import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
@ObjectType()
export class Location {
  @Prop()
  @Field()
  tel: string;

  @Prop()
  @Field(() => Int)
  zipCode: number;

  @Prop()
  @Field()
  firtsName: string;

  @Prop()
  @Field()
  lastName: string;

  @Prop()
  @Field()
  address: string;

  @Prop()
  @Field()
  city: string;

  @Prop()
  @Field()
  state: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
/*
  tel string
  zipCode int
  firtsName string
  lastName string
  address string
  city string
  state string
  locationUsers array[]
  */
