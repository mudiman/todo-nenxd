import { Injectable, Dependencies } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user.input';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return false;
  }

  async login(loginUserInput: LoginUserInput) {
    const user: any = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    if (!user) throw new Error('Login failed');
    const payload = {
      email: user.email,
      first_name: user.first_name,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
