import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt = require('bcrypt');
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: RefreshTokenService,
  ) {}

  async login(user: User) {
    return await this.tokenService.generateToken(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username, true, ['userRole', 'userRole.role']);    
    if(user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
