import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole]),
    RolesModule,
  ],
  providers: [UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
