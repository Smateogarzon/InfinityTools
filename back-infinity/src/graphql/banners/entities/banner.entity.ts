import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString, IsUrl, Length } from 'class-validator';

export type BannerDocument = HydratedDocument<Banner>;

@Schema()
@ObjectType()
export class Banner {
  @Field()
  _id: string;
  @Prop()
  @Field()
  @IsString()
  @Length(3, 50)
  name: string;

  @Prop()
  @Field()
  @IsUrl()
  picture: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  label: string[];
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
