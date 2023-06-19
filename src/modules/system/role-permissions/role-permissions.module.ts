import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entities/role-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermission])
  ],
  providers: [RolePermissionsService]
})
export class RolePermissionsModule {}
