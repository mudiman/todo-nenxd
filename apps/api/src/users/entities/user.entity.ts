import { ObjectType, Field, Int } from '@nestjs/graphql';
import UserModel from '../dto/users';
import { Factory } from "nestjs-seeder";
import { Schema } from 'dynamoose';

@ObjectType()
export class User extends UserModel {

  @Field(type => String, { nullable: false })
  id: string;

  @Field(type => String, { nullable: false })
  first_name: string;

  @Field(type => String, { nullable: true })
  last_name: string;

  @Field(type => String, { nullable: false })
  email: string;

  @Field(type => String, { nullable: false })
  password: string;
}
