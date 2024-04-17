import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesHistoryService } from './sales-history.service';
import { SalesHistory } from './entities/sales-history.entity';
import { CreateSalesHistoryInput } from './dto/create-sales-history.input';
import { UpdateSalesHistoryInput } from './dto/update-sales-history.input';

@Resolver(() => SalesHistory)
export class SalesHistoryResolver {
  constructor(private readonly salesHistoryService: SalesHistoryService) {}

  @Mutation(() => SalesHistory)
  createSalesHistory(
    @Args('createSalesHistoryInput') createSalesHistoryInput: CreateSalesHistoryInput
  ) {
    return this.salesHistoryService.create(createSalesHistoryInput);
  }

  @Query(() => [SalesHistory], { name: 'salesHistory' })
  findAll() {
    return this.salesHistoryService.findAll();
  }

  @Query(() => SalesHistory, { name: 'salesHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salesHistoryService.findOne(id);
  }

  @Mutation(() => SalesHistory)
  updateSalesHistory(
    @Args('updateSalesHistoryInput') updateSalesHistoryInput: UpdateSalesHistoryInput
  ) {
    return this.salesHistoryService.update(updateSalesHistoryInput.id, updateSalesHistoryInput);
  }

  @Mutation(() => SalesHistory)
  removeSalesHistory(@Args('id', { type: () => Int }) id: number) {
    return this.salesHistoryService.remove(id);
  }
}
