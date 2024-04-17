import { Module } from '@nestjs/common';
import { SalesHistoryService } from './sales-history.service';
import { SalesHistoryResolver } from './sales-history.resolver';

@Module({
  providers: [SalesHistoryResolver, SalesHistoryService],
})
export class SalesHistoryModule {}
