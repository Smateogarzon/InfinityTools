import { Resolver } from '@nestjs/graphql';
import { SalesHistory } from './entities/sales-history.entity';
// import { SalesHistoryService } from './sales-history.service';
// import { CreateSalesHistoryInput } from './dto/create-sales-history.input';
// import { UpdateSalesHistoryInput } from './dto/update-sales-history.input';

@Resolver(() => SalesHistory)
export class SalesHistoryResolver {
  // constructor(private readonly salesHistoryService: SalesHistoryService) {}
}
