import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshToken } from '../../refresh-token/entities/refresh-token.entity';
import { Story } from '../../../../modules/public/stories/entities/story.entity';
import { Comment } from '../../../../modules/public/comments/entities/comment.entity';
import { UserRole } from '../../user-roles/entities/user-role.entity';

@Entity('users', { schema: 'system' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('character varying', { name: 'username', length: 100 })
  @Field()
  username: string;

  @Column('character varying', { name: 'first_name', length: 50 })
  @Field()
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 50 })
  @Field()
  lastName: string;

  @Column('int8', { name: 'image', nullable: true })
  @Field(() => Int, { nullable: true })
  image?: number;

  @Column('character varying', { name: 'password', length: 100 })
  @Field()
  password: string;

  @Column('character varying', { name: 'email', length: 100 })
  @Field()
  email: string;

  @Column('character varying', { name: 'status', length: 50 })
  @Field()
  status: string;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  creationDate?: Date;

  @OneToMany(() => Story, (story) => story.user)
  @Field(() => [Story])
  story?: Story[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments?: Comment[];

  @OneToMany(() => RefreshToken, (refreshTokens) => refreshTokens.user)
  @Field(() => [RefreshToken])
  refreshTokens?: RefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  @Field(() => [UserRole])
  userRoles?: UserRole[];
}
