import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginResponse } from './dto/login-response.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { RefreshInputDto } from './dto/refresh.input.dto';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: RefreshTokenService,
) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') loginInput: CreateAuthInput, @Context() context) {
    return await this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse)
  async refresh(@Args('refreshInput') refreshInput: RefreshInputDto) {
    return  await this.tokenService.refreshToken(refreshInput);
  }
}
