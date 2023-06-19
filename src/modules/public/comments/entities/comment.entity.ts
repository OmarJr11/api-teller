import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Story } from '../../stories/entities/story.entity';
import { User } from '../../../../modules/system/users/entities/user.entity';

@Entity('comments', { schema: 'public' })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('int8', { name: 'id_story' })
  @Field(() => Int)
  idStory: number;

  @Column('int8', { name: 'like', default: 0 })
  @Field(() => Int)
  like: number;

  @Column('text', { name: 'text' })
  @Field()
  text: string;

  @Column('character varying', { name: 'status', length: 50 })
  @Field()
  status: string;

  @Column('int8', { name: 'creator', nullable: true, select: false })
  @Field(() => Int)
  creator?: number;

  @Column('int8', { name: 'modifier', nullable: true, select: false })
  @Field(() => Int)
  modifier?: number;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  creationDate?: Date | string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'modification_date',
    nullable: true,
    select: false,
  })
  @Field(() => Date)
  modificationDate?: Date;

  @ManyToOne(() => Story, (story) => story.comments)
  @JoinColumn([{ name: 'id_story', referencedColumnName: 'id' }])
  @Field(() => Story)
  story?: Story;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: 'creator', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;
}
