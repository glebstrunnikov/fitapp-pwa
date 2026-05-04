import { Module } from '@nestjs/common';
import { ExListController } from './ex-list.controller';
import { ExListService } from './ex-list.service';

@Module({
  controllers: [ExListController],
  providers: [ExListService],
})
export class ExListModule {}
