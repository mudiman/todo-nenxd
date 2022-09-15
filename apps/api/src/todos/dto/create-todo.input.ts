import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(type => String)
  body: string;

  @Field(type => Boolean, { defaultValue: false })
  completed: boolean;
}
