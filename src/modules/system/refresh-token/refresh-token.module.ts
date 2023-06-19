import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenResolver } from './refresh-token.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken])
  ],
  providers: [RefreshTokenResolver, RefreshTokenService]
})
export class RefreshTokenModule {}
