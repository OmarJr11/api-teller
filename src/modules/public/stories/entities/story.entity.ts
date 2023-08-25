import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { File } from 'src/modules/system/files/entities/file.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../../../modules/system/users/entities/user.entity';

@Entity('stories', { schema: 'public' })
@ObjectType()
export class Story {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('character varying', { name: 'title', length: 150 })
  @Field()
  title: string;

  @Column('text', { name: 'text' })
  @Field()
  text: string;

  @Column('int8', { name: 'like', default: 0 })
  @Field(() => Int)
  like?: number;

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

  @Column('int8', { name: 'creator', select: false })
  @Field(() => Int)
  creator: number;

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

  @ManyToOne(() => User, (user) => user.story)
  @JoinColumn([{ name: 'creator', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;

  @OneToOne(() => File, (file) => file.id)
  @JoinColumn([{ name: 'image', referencedColumnName: 'id' }])
  @Field(() => File)
  file?: File;

  @OneToMany(() => Comment, (comment) => comment.story)
  @Field(() => [Comment])
  comments?: Comment[];
}
