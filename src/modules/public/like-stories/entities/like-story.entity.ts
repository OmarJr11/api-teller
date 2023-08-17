import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

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
  creator?: number;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  creationDate?: Date | string;
}
