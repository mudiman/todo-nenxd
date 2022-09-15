import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/auth.currentUser';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async createTodo(@CurrentUser() user: User, @Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return await this.todosService.create(createTodoInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Todo], { name: 'todos' })
  async findAll(@CurrentUser() user: User) {
    return await this.todosService.findAll(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Todo, { name: 'todo' })
  async findOne(@CurrentUser() user: User, @Args('id', { type: () => String }) id: string) {
    return await this.todosService.findOne(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async updateTodo(@CurrentUser() user: User, @Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return await this.todosService.update(updateTodoInput.id, updateTodoInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  removeTodo(@CurrentUser() user: User, @Args('id', { type: () => String }) id: string) {
    return this.todosService.remove(id, user);
  }
}
