import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;

@Schema()
@ObjectType()
export class Banner {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  picture: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
