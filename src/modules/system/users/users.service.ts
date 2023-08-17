import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import bcrypt = require('bcrypt');
import { UserRolesService } from '../user-roles/user-roles.service';
import { RolesEnum } from 'src/common/enum/roles.enum';

@Injectable()
export class UsersService {
  private readonly salt = process.env.FRONTEND_URL;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userRolesService: UserRolesService,
  ) { }

  /**
   * Create user
   * @param {CreateUserInput} data - data to create
   * @returns {Promise<User>}
   */
  async create(data: CreateUserInput): Promise<User> {
    data.email = data.email.toLocaleLowerCase();
    await this.checkEmail(data.email);
    await this.checkUsername(data.username);
    data.password = bcrypt.hashSync(data.password, Number(this.salt));
    const user = await this.userRepository.save(
      {...data, status: 'Active'}
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    await this.userRolesService.create(user.id, RolesEnum.USER);
    return this.formatUser(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({ order: { creationDate: "DESC", } });
    return this.formatUsers(users);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ 
      id,
      status: 'Active'
    }).catch(() => {
      throw new InternalServerErrorException('El usuario no existe')
    });
    return this.formatUser(user);
  }

  async findOneByUsername(username: string, withPassword?: boolean, relations?: string[]): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ 
      where: {
        username,
        status: 'Active'
      },
      relations,
    }).catch(() => {
      throw new InternalServerErrorException('El usuario no existe')
    });
    return withPassword ? user : this.formatUser(user);
  }

  async update(data: UpdateUserInput): Promise<User>  {
    if(data.username) {
      await this.checkUsername(data.username);
    }

    if(data.email) {
      await this.checkEmail(data.email);
    }

    const user = await this.findOneById(data.id);
    await this.userRepository.update(
      data, user
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo');
    })
    return await this.findOneById(data.id);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    await this.userRepository.update(
      {status: 'Deleted'}, user
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo');
    })
    return true;
  }
  
  private async checkEmail(email: string) {
    const emailAlreadyExist = await this.userRepository.findOne({
      where: {
        email,
        status: 'Active'
      }
    });

    if(emailAlreadyExist) {
      throw new ForbiddenException('Email already exist');
    }
  }

  private async checkUsername(username: string) {
    const usernameAlreadyExist = await this.userRepository.findOne({
      where: {
        username,
        status: 'Active'
      }
    });

    if(usernameAlreadyExist) {
      throw new ForbiddenException('Username already exist');
    }
  }

  private formatUser(user: User): User {
    delete user?.password;
    return user;
  }

  private formatUsers(users: User[]): User[] {
    for(const user of users) {
      this.formatUser(user);
    }
    return users;
  }
}