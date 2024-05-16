import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

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

  @Field(() => String, { nullable: true })
  category: string;

  @Field(() => String, { nullable: true })
  subcategory: string;

  @Field({ nullable: true })
  brand: string;
}
