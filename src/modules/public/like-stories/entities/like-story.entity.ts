import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Story } from '../../stories/entities/story.entity';

@Entity('like_stories', { schema: 'public' })
@ObjectType()
export class LikeStory {
  @Column('int8', { name: 'id_story', primary: true })
  @Field(() => Int)
  idStory: number;

  @Column('character varying', { name: 'status', length: 50 })
  @Field()
  status: string;

  @Column('int8', { name: 'creator', primary: true})
  @Field(() => Int)
  creator: number;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  creationDate?: Date | string;

  @ManyToOne(() => Story, (story) => story.likes)
  @JoinColumn([{ name: 'id_story', referencedColumnName: 'id' }])
  @Field(() => Story)
  story?: Story;
}
