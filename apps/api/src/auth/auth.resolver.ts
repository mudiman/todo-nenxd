import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { LoggedUserOutput } from './dto/logout-user.output';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => LoggedUserOutput)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
