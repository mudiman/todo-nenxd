import { Injectable, Dependencies } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginUserInput: LoginUserInput) {
        const user: any = this.validateUser(loginUserInput.email, loginUserInput.password)
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