import { Injectable } from '@nestjs/common';
import { Model } from 'dynamoose/dist/Model';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

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
    const saltOrRounds = 10;
    const password = createUserInput.password;
    createUserInput.password = await bcrypt.hash(password, saltOrRounds);

    const result = await this.model.create({
      ...createUserInput,
      id: uuid()
    });

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

  async findOneByEmail(email: string) {
    const user = await this.model.get({ email: email });
    if (user == undefined) throw new Error("User does not exist");
    return user;
  }

  async findOne(id: string) {
    const user = await this.model.get({ id: id });
    if (user == undefined) throw new Error("User does not exist");
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.model.get({ id: id });
    if (user == undefined) throw new Error("User does not exist");
    return await this.model.update({ id: id }, updateUserInput);
  }

  async remove(id: string) {
    try {
      const user = await this.model.get({ id: id });
      if (user == undefined) throw new Error("User does not exist");
      await this.model.delete(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
