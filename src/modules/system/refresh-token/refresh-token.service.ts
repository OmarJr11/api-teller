import { Injectable } from '@nestjs/common';
import { CreateRefreshTokenInput } from './dto/create-refresh-token.input';
import { UpdateRefreshTokenInput } from './dto/update-refresh-token.input';

@Injectable()
export class RefreshTokenService {
  create(createRefreshTokenInput: CreateRefreshTokenInput) {
    return 'This action adds a new refreshToken';
  }

  findAll() {
    return `This action returns all refreshToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refreshToken`;
  }

  update(id: number, updateRefreshTokenInput: UpdateRefreshTokenInput) {
    return `This action updates a #${id} refreshToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} refreshToken`;
  }
}
