import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('files', { schema: 'system' })
@ObjectType()
export class File {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  id: number;

  @Column('character varying', { name: 'filename', length: 500 })
  @Field()
  filename: string;

  @Column('character varying', { name: 'url', length: 500 })
  @Field()
  url: string;

  @Column('character varying', { name: 'extension', length: 20 })
  @Field()
  extension: string;

  @Column('int8', { name: 'creator', nullable: true, select: false })
  @Field(() => Int)
  creator?: number;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  creationDate?: Date | string;

  @ManyToOne(() => User, (user) => user.story)
  @JoinColumn([{ name: 'creator', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;
}
