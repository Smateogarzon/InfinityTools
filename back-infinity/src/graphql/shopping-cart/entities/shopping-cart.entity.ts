import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProductCart {
  @Field({ nullable: true })
  idProduct: string;

  @Field({ nullable: true })
  priceProduct: number;

  @Field({ nullable: true })
  quantity: number;

  @Field({ nullable: true })
  total: number;
}
