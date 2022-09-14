import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';

@Module({
  providers: [TodosResolver, TodosService]
})
export class TodosModule {}
