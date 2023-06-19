import { Injectable } from '@nestjs/common';
import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';

@Injectable()
export class RolePermissionsService {
  create(createRolePermissionInput: CreateRolePermissionInput) {
    return 'This action adds a new rolePermission';
  }

  findAll() {
    return `This action returns all rolePermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolePermission`;
  }

  update(id: number, updateRolePermissionInput: UpdateRolePermissionInput) {
    return `This action updates a #${id} rolePermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolePermission`;
  }
}
