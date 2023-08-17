import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRolesModule } from '../user-roles/user-roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserRolesModule,
  ],
  providers: [
    UsersResolver, 
    UsersService, 
  ],
  exports: [UsersService]
})
export class UsersModule {}
