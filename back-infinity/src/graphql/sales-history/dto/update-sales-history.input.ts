import { CreateSalesHistoryInput } from './create-sales-history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalesHistoryInput extends PartialType(CreateSalesHistoryInput) {
  @Field(() => Int)
  id: number;
}
