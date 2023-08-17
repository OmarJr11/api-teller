import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }
  
  async create(createRoleInput: CreateRoleInput) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneOrFail({
      where: {
        id,
        status: 'Active'
      }
    }).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    })
    return role;
  }

  async findOneByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOneOrFail({
      where: {
        name,
        status: 'Active'
      }
    }).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    })
    return role;  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
