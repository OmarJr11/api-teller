import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('user_roles', { schema: 'system' })
@ObjectType()
export class UserRole {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('int8', { name: 'id_role' })
  @Field(() => Int)
  idRole: number;

  @Column('int8', { name: 'id_user' })
  @Field(() => Int)
  idUser: number;

  @Column('character varying', { name: 'status', length: 50 })
  @Field()
  status: string;

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

  @Column('int8', { name: 'modifier', nullable: true, select: false })
  @Field(() => Int)
  modifier?: number;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'modification_date',
    nullable: true,
    select: false,
  })
  @Field(() => Date)
  modificationDate?: Date;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn([{ name: 'id_role', referencedColumnName: 'id' }])
  @Field(() => Role)
  role?: Role;
}
