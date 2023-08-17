import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
    private readonly roleService: RolesService,
  ) { }
  
  async create(idUser: number, roleName: string): Promise<UserRole> {
    const role = await this.roleService.findOneByName(roleName);    
    const userRole = await this.userRoleRepository.save(
      {idUser, idRole: role.id, status: 'Active'}
    ).catch(() => {      
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return userRole;
  }

  findAll() {
    return `This action returns all userRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }
}
