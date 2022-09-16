import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';

import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { UsersModule } from '../users/users.module';
import { TodoSchema } from './dto/todos';
import { UserSchema } from '../users/dto/users';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    DynamooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
  ],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
