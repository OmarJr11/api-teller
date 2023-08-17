import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  providers: [
    AuthResolver, 
    AuthService, 
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
  ],
  imports: [
    UsersModule,
    PassportModule,
    RefreshTokenModule,
  ]
})
export class AuthModule {}
