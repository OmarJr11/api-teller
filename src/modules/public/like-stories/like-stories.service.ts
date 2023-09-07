import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLikeStoryInput } from './dto/create-like-story.input';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeStory } from './entities/like-story.entity';
import { Repository } from 'typeorm';
import { IUserReq } from '../../../common/interfaces/user-req.interface';

@Injectable()
export class LikeStoriesService {
  constructor(
    @InjectRepository(LikeStory) private storyRepository: Repository<LikeStory>,
  ) {}

  /**
   * Create like story
   * @param {CreateStoryInput} data - data to create
   * @param {IUserReq} user - user logged
   */
  async create(data: CreateLikeStoryInput, user: IUserReq) {
    const like = await this.findOneByStoryAndCreator(data.idStory, user.userId);
    if(like) {
      throw new InternalServerErrorException('Ya existe un like story con ese id story y creator');
    }
    await this.storyRepository.save(
      {...data, status: 'Active', creator: user.userId}
    ).catch((e) => {
      console.log(e);
      
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
  }

  findAll() {
    return `This action returns all likeStories`;
  }

  async findOneByStoryAndCreator(id: number, creator: number): Promise<LikeStory> {
    const like = await this.storyRepository.findOneBy({
      idStory: id, creator,
    });
    return like;
  }

  async remove(id: number, user: IUserReq) {
    const like = await this.findOneByStoryAndCreator(id, user.userId);
    console.log(like);
    
    if(!like) {
      throw new InternalServerErrorException('No existe un like story con ese id story y creator');
    }
    await this.storyRepository.remove(like, { data: user }).catch((e) => {
      console.log(e);
      
        throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
  }
}
