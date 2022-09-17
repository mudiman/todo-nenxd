import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectModel, Model } from 'nestjs-dynamoose';

import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoInterface, TodoKeyInterface } from './dto/todos';
import { CurrentUserInterface } from 'src/auth/auth.currentUser';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo')
    private todoModel: Model<TodoInterface, TodoKeyInterface>,
  ) {}

  async create(createTodoInput: CreateTodoInput, user: CurrentUserInterface) {
    const result = await this.todoModel.create({
      ...createTodoInput,
      id: uuid(),
      user: user.id,
    });
    if (!result) {
      throw new Error('Created create todo');
    }
    return result;
  }

  async findAll(user: CurrentUserInterface) {
    const result = await await this.todoModel
      .scan()
      .where('user')
      .eq(user.id)
      .all()
      .exec();
    if (result.count === 0) throw new Error('Todo does not exist');
    return result;
  }

  async findOne(id: string, user: CurrentUserInterface) {
    const result = await this.todoModel
      .scan()
      .where('id')
      .eq(id)
      .where('user')
      .eq(user.id)
      .limit(1)
      .all()
      .exec();
    if (result.count === 0) throw new Error('Todo does not exist');
    const todo = await result.shift();
    return todo;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput, user: CurrentUserInterface) {
    const result = await this.todoModel
      .scan()
      .where('id')
      .eq(id)
      .where('user')
      .eq(user.id)
      .limit(1)
      .all()
      .exec();
    if (result.count === 0) throw new Error('Todo does not exist');
    return await this.todoModel.update(updateTodoInput);
  }

  async remove(id: string, user: CurrentUserInterface) {
    try {
      const result = await this.todoModel
        .scan()
        .where('id')
        .eq(id)
        .where('user')
        .eq(user.id)
        .limit(1)
        .all()
        .exec();
      if (result.count === 0) throw new Error('Todo does not exist');
      await this.todoModel.delete({ id: id });
      const todo = await result.shift();
      return todo;
    } catch (error) {
      throw new Error(error);
    }
  }
}
