import { ObjectType, Field } from '@nestjs/graphql';
import { ObjectId, ObjectIdColumn, Column, Entity } from 'typeorm';
import { Rol } from '@/graphql/enums/user.enum';
import { Location } from './location.entity';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => String)
  _id: ObjectId;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'enum', enum: Rol, default: Rol.USER })
  @Field(() => Rol, { defaultValue: Rol.USER, nullable: true })
  rol: Rol;

  @Column()
  @Field()
  gender: 'male' | 'female' | 'other';

  @Column({ nullable: true })
  @Field(() => Location, { nullable: true, defaultValue: null })
  userlocation?: Location;

  @Column()
  @Field()
  suscriber: boolean;

  @Column()
  @Field()
  status: 'active' | 'inactive';

  @Column()
  @Field()
  salesHistory?: number;

  @Column()
  @Field()
  reviews?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image?: string;

  @Column()
  @Field()
  shoppingCart?: number;
}
