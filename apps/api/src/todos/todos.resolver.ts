import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/auth.currentUser';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  // @Query(returns => Todo)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async createTodo(@CurrentUser() user: User, @Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return await this.todosService.create(createTodoInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Todo], { name: 'todos' })
  async findAll() {
    return await this.todosService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.todosService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return await this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => String }) id: string) {
    return this.todosService.remove(id);
  }
}
