import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('role_permissions', { schema: 'system' })
@ObjectType()
export class RolePermission {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('int8', { name: 'id_role' })
  @Field(() => Int)
  idRole: number;

  @Column('int8', { name: 'id_permission' })
  @Field(() => Int)
  idPermission: number;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  creationDate?: Date | string;

  @Column('int8', { name: 'creator', nullable: true, select: false })
  @Field(() => Int)
  creator?: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'creator', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn([{ name: 'id_role', referencedColumnName: 'id' }])
  @Field(() => Role)
  role?: Role;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinColumn([{ name: 'id_permission', referencedColumnName: 'id' }])
  @Field(() => Permission)
  permission?: Permission;
}
