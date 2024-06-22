import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBannerInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  label: string;

  @Field({ nullable: true })
  only: boolean;
}
