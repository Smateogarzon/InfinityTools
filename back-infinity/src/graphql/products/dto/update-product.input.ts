import { IsNumber, IsPositive } from 'class-validator';
import { CreateProductInput } from './create-product.input';
import { InputType, Field, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String)
  _id: string;
  @Field(() => Boolean, { nullable: true })
  status: boolean;
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
