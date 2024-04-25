import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserGender, UserRol, UserStatus } from '../enums/user.enums';
import { Location, LocationDocument } from '@/graphql/location/entities/location.entity';
import { IsEmail, IsString, IsEnum, IsOptional, Length } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType()
export class User {
  @Prop({ isRequired: false, set: (v: string) => v?.toLowerCase() })
  @Field()
  @IsString()
  @Length(2, 30)
  firtsName: string;

  @Prop({ required: false, set: (v: string) => v?.toLowerCase() })
  @Field({ nullable: true })
  @IsString()
  @Length(2, 30)
  MiddleName: string;

  @Prop({ required: false, set: (v: string) => v?.toLowerCase() })
  @Field()
  @IsString()
  @Length(2, 30)
  lastName: string;

  @Prop({ required: false, set: (v: string) => v?.toLowerCase() })
  @Field({ nullable: true })
  @IsString()
  MiddleLastName: string;

  @Prop({ required: true })
  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Prop({ required: false })
  @Field({ nullable: true })
  @IsString()
  password: string;

  @Prop({ default: UserRol.USER })
  @Field(() => UserRol, { defaultValue: UserRol.USER })
  @IsEnum(UserRol)
  rol: UserRol;

  @Prop({ nullable: true })
  @Field(() => UserGender, { nullable: true })
  @IsEnum(UserGender)
  gender: UserGender;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location', onDelete: 'CASCADE' })
  @Field(() => Location, { nullable: true })
  @IsOptional()
  location: LocationDocument;

  @Prop()
  @Field()
  suscribe: boolean;

  @Prop({ default: UserStatus.ACTIVE })
  @Field(() => UserStatus, { defaultValue: UserStatus.ACTIVE })
  @IsEnum(UserStatus)
  status: UserStatus;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  picture: string;

  @Prop()
  @Field()
  salesHistory: string;

  @Prop()
  @Field()
  reviews: string;

  @Prop()
  @Field()
  shoppingCart: string;

  @Prop()
  @Field()
  orders: string;

  @Prop({ default: new Date() })
  @Field(() => Date)
  date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

/*


  suscribe boolean
  status boolean
  salesHistory arraystring
  reviews object 
  shoppingCart object
  orders arraystring
*/
