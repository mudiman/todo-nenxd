import { Injectable } from '@nestjs/common';
import { Model } from 'dynamoose/dist/Model';
import { v4 as uuid } from 'uuid';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import UserModel from './dto/users';

@Injectable()
export class UsersService {
  private model: Model;

  constructor() {
    this.model = UserModel;
  }

  async create(createUserInput: CreateUserInput) {
    const result = await this.model.create({
      id: uuid(),
      first_name: createUserInput.first_name,
      last_name: createUserInput.last_name,
      email: createUserInput.email,
      password: createUserInput.password,
    })
    if (!result) {
      throw new Error("Created create new user");
    }
    return result;
  }

  async findAll() {
    let result = await this.model.scan().exec();
    if (result.count === 0) {
      return Promise.reject("User not found");
    } else {
      return result;
    }
  }

  async findOne(id: string) {
    console.info('data', id, await this.model.get({ id: id }))
    return await this.model.get({ id: id });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return await this.model.delete(id);
  }
}
