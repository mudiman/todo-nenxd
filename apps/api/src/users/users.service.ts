import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import UserModel, { UserInterface, UserKeyInterface } from './dto/users';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private userModel: Model<UserInterface, UserKeyInterface>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const saltOrRounds = 10;
    const password = createUserInput.password;
    createUserInput.password = await bcrypt.hash(password, saltOrRounds);

    const result = await this.userModel.create({
      ...createUserInput,
      id: uuid()
    });

    if (!result) {
      throw new Error("Created create new user");
    }
    return result;
  }

  async findAll() {
    let result = await this.userModel.scan().exec();
    if (result.count === 0) {
      return Promise.reject("User not found");
    } else {
      return result;
    }
  }

  async findOneByEmail(email: string) {
    const result = await this.userModel.scan().where('email').eq(email).limit(1).all().exec()
    if (result.count === 0) throw new Error("User does not exist");
    const user = await result.shift()
    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.get({ id: id });
    if (user == undefined) throw new Error("User does not exist");
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userModel.get({ id: id });
    if (user == undefined) throw new Error("User does not exist");
    return await this.userModel.update({ id: id }, updateUserInput);
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.get({ id: id });
      if (user == undefined) throw new Error("User does not exist");
      await this.userModel.delete({ id: id });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
