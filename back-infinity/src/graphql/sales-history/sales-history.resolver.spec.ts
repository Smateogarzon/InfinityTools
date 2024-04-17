import { Test, TestingModule } from '@nestjs/testing';
import { SalesHistoryResolver } from './sales-history.resolver';
import { SalesHistoryService } from './sales-history.service';

describe('SalesHistoryResolver', () => {
  let resolver: SalesHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesHistoryResolver, SalesHistoryService],
    }).compile();

    resolver = module.get<SalesHistoryResolver>(SalesHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
