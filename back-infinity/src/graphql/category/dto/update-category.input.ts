import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class Subcategory extends PartialType(CreateCategoryInput) {
  @Field(() => String, { nullable: true })
  subcategory: string;
}
