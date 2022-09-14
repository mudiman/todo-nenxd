import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import TodoModel from '../dto/todos';

@ObjectType()
export class Todo extends TodoModel {  

  @Field(type => String)
  id: string;

  @Field(type => String)
  body: string;

  @Field(type => Boolean, { defaultValue: false })
  completed: number;

  @Field(type => User, { nullable: false })
  user: User;
}
