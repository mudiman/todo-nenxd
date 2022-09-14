import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Model } from 'dynamoose/dist/Model';

import { CreateTodoInput } from './dto/create-todo.input';
import TodoModel from './dto/todos';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodosService {
  private model: Model;
  
  constructor() {
    this.model = TodoModel;
  }

  async create(createTodoInput: CreateTodoInput) {
    const result = await this.model.create({
      id: uuid(),
      body: createTodoInput.body,
      completed: createTodoInput.completed
    })
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
    return await this.model.get(id);
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    return await this.model.update({
      id: id,
      body: updateTodoInput.body,
      completed: updateTodoInput.completed,
    });
  }

  async remove(id: string) {
    return await this.model.delete(id);
  }
}
