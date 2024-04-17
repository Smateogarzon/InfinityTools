import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';
import { Column } from 'typeorm';

@ObjectType()
export class Location {
  @Column()
  @Field(() => String)
  @IsString()
  @Matches(/^\+/, { message: 'Numero de telefono invalido' })
  tel: string;

  @Column()
  @Field(() => Number)
  zipCode: number;

  @Column()
  @Field(() => String)
  firtsName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => String)
  state: string;

  @Column({ nullable: true }) // Allow null values for use
  @Field(() => String, { nullable: true }) // Specify String type for user IDs
  use?: string; // Change type to string
}
