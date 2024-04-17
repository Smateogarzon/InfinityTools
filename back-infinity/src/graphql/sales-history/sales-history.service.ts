import { Injectable } from '@nestjs/common';
// import { CreateSalesHistoryInput } from './dto/create-sales-history.input';
// import { UpdateSalesHistoryInput } from './dto/update-sales-history.input';

@Injectable()
export class SalesHistoryService {
  // create(createSalesHistoryInput: CreateSalesHistoryInput) {
  //   return 'This action adds a new salesHistory';
  // }

  findAll() {
    return `This action returns all salesHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesHistory`;
  }

  // update(id: number, updateSalesHistoryInput: UpdateSalesHistoryInput) {
  //   return `This action updates a #${id} salesHistory`;
  // }

  remove(id: number) {
    return `This action removes a #${id} salesHistory`;
  }
}
