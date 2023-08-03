import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../user-roles/entities/user-role.entity';

@Entity('roles', { schema: 'system' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('character varying', { name: 'name', length: 50, unique: true })
  @Field()
  name: string;

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

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: 'creator', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  @Field(() => [UserRole])
  userRoles?: UserRole[];
}
