import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field((type) => String, { nullable: false })
  first_name: string;

  @Field((type) => String, { nullable: true })
  last_name: string;

  @Field((type) => String, { nullable: false })
  email: string;

  @Field((type) => String, { nullable: false })
  password: string;
}
