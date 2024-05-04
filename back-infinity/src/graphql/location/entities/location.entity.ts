import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString, IsPostalCode, Length } from 'class-validator';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
@ObjectType()
export class Location {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field()
  @IsString()
  @Length(10, 20)
  tel: string;

  @Prop()
  @Field(() => String)
  @IsPostalCode()
  zipCode: string;

  @Prop()
  @Field()
  address: string;

  @Prop()
  @Field()
  @IsString()
  city: string;

  @Prop()
  @Field()
  @IsString()
  state: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
