import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('refresh_tokens', { schema: 'system' })
@ObjectType()
export class RefreshToken {
  @Column('int8', { name: 'id_user', primary: true})
  @Field(() => Int)
  idUser: number;

  @Column('character varying', { name: 'token', length: 400, primary: true })
  @Field()
  token: string;

  @Column('character varying', { name: 'refresh', length: 400 })
  @Field()
  refresh: string;

  @Column('character varying', { name: 'id_role', length: 50 })
  @Field()
  idRole: string;

  @Column('timestamp without time zone', { name: 'expire' })
  @Field()
  expire: Date;

  @Column('timestamp without time zone', {
      name: 'creation_date',
      select: true,
      default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  creationDate?: Date;
  
  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;
}
