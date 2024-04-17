import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserGender, UserRol, UserStatus } from '../enums/user.enums';
import { Location, LocationDocument } from '@/graphql/location/entities/location.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType()
export class User {
  @Prop({ required: true })
  @Field({ nullable: true })
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop({ default: UserRol.USER })
  @Field(() => UserRol, { defaultValue: UserRol.USER })
  rol: UserRol;

  @Prop({ nullable: true })
  @Field(() => UserGender, { nullable: true })
  gender: UserGender;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  @Field(() => Location, { nullable: true })
  location: LocationDocument;

  @Prop()
  @Field()
  suscribe: boolean;

  @Prop({ default: UserStatus.ACTIVE })
  @Field(() => UserStatus, { defaultValue: UserStatus.ACTIVE })
  status: UserStatus;

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
