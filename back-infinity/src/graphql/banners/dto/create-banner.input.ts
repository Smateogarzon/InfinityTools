import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBannerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
