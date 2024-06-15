import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateShoppingCartInput {
  @Field()
  idProduct: string;

  @Field({ nullable: true })
  priceProduct: number;

  @Field()
  quantity: number;

  @Field({ nullable: true })
  total: number;
}
