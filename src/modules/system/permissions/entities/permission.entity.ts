import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('permissions', { schema: 'system' })
@ObjectType()
export class Permission {
  @PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
  @Field(() => ID)
  id: number;

  @Column('character varying', { name: 'name', length: 150 })
  @Field()
  name: string;

  @Column('character varying', { name: 'type', length: 150 })
  @Field()
  type: string;

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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'creator', referencedColumnName: 'id' }])
  @Field(() => User)
  user?: User;
}
