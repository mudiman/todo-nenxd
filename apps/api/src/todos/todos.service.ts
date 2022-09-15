import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Model } from 'dynamoose/dist/Model';

import { CreateTodoInput } from './dto/create-todo.input';
import TodoModel from './dto/todos';
import { UpdateTodoInput } from './dto/update-todo.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  private model: Model;
  
  constructor() {
    this.model = TodoModel;
  }

  async create(createTodoInput: CreateTodoInput, user: User) {
    console.info('aaa', createTodoInput, user)
    const result = await this.model.create({
      ...createTodoInput,
      id: uuid()
    })
    console.info('result', result)
    if (!result) {
      throw new Error("Created create todo");
    }
    return result;
  }

  async findAll() {
    let result = await this.model.scan().exec();
    if (result.count === 0) {
      return Promise.reject("Todo not found");
    } else {
      return result;
    }
  }

  async findOne(id: string) {
    const todo = await this.model.get({ id: id });
    if (todo == undefined) throw new Error("Todo does not exist");
    return todo;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    const todo = await this.model.get({ id: id });
    if (todo == undefined) throw new Error("Todo does not exist");
    return await this.model.update(updateTodoInput);
  }

  async remove(id: string) {
    try {
      const user = await this.model.get({ id: id });
      if (user == undefined) throw new Error("Todo does not exist");
      await this.model.delete(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
