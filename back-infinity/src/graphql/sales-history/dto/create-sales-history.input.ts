import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSalesHistoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
