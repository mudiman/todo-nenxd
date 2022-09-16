import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import UserModel from '../dto/users';

@ObjectType()
export class User extends UserModel {
  @Field((type) => String, { nullable: false })
  id: string;

  @Field((type) => String, { nullable: false })
  first_name: string;

  @Field((type) => String, { nullable: true })
  last_name: string;

  @Field((type) => String, { nullable: false })
  email: string;

  @HideField()
  password: string;
}
