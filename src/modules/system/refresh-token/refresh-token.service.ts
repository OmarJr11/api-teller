import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { generateRandomCodeByLength } from '../../../common/helpers/generators.helper';
import { ITokenGenerate } from './interfaces/token-generate.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RefreshInputDto } from '../auth/dto/refresh.input.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken) private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly _jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Generate new token (refresh it)
   * @param {RefreshInputDto} refresh - User owner of the token
   * @returns {Promise<{ user: User, tokens: { token: string, refresh: string }}>} - Tokens Saved in database
   */
  async refreshToken(refresh: RefreshInputDto): Promise<{ user: User; tokens: { token: string, refresh: string } }> {
    const refreshToken = await this.refreshTokenRepository
      .findOneOrFail({
        where: {
          idUser: refresh.idUser,
          token: refresh.token,
          refresh: refresh.refresh,
          expire: MoreThan(new Date()),
        }
      })
      .catch(() => {
        throw new UnauthorizedException({
          success: false,
          message: 'Unauthorized',
        });
      });

    await this.refreshTokenRepository.remove(refreshToken);

    const user = await this.userService.findOneById(refresh.idUser).catch(() => {
      throw new UnauthorizedException({
        success: false,
        message: 'Unauthorized',
      });
    });

    return {
      user,
      tokens: await this.generateToken(user),
    };
  }

  /**
   * Generate Token to header requests
   *
   * @param {*} user - Logged user
   * @returns {Promise<{ token: string, refresh: string }>}
   */
  async generateToken(user: User): Promise<{ token: string, refresh: string }> {
      const data = {
        username: user.username,
        email: user.email,
        sub: user.id,
        status: user.status,
      };
  
      const token = this._jwtService.sign(data, {
        expiresIn: Number(process.env.TOKEN_TIME),
      });
  
      const refresh = generateRandomCodeByLength(400);
  
      //Set expiration date with 1 month
      const expire = new Date();
      expire.setMonth(expire.getMonth() + 1);
  
      await this.refreshTokenRepository.save({ token, refresh, expire, idUser: user.id });
  
      return { token, refresh };
  }
}
