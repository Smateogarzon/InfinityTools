import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly manager: EntityManager) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
