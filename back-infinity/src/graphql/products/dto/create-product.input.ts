import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsArray, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float, { nullable: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  purchasePrice: number;

  @Field(() => Float, { nullable: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  sellingPrice: number;

  @Field(() => Float, { nullable: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  referencePrice: number;

  @Field(() => Float, { nullable: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  distributorPrice: number;

  @Field(() => Float, { nullable: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  referencePriceDistributor: number;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsArray()
  category: string[];

  @Field(() => String, { nullable: true })
  picture: string;

  @Field(() => Int)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  stock: number;

  @Field({ nullable: true })
  brand: string;
}
