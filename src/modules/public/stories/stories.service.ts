import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStoryInput } from './dto/create-story.input';
import { UpdateStoryInput } from './dto/update-story.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { IUserReq } from 'src/common/interfaces/user-req.interface';
import { CreateLikeStoryInput } from '../like-stories/dto/create-like-story.input';
import { LikeStoriesService } from '../like-stories/like-stories.service';

@Injectable()
export class StoriesService {

  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
    private likeStoryService: LikeStoriesService,
  ) {}
  
  /**
   * Create Story
   * @param {CreateStoryInput} data - data to create
   * @param {IUserReq} user - user logged
   * @returns {Promise<Story>}
   */
  async createStory(data: CreateStoryInput, user: IUserReq): Promise<Story> {    
    if(!data.text || !data.title) {
      throw new ForbiddenException('Title and text must be exist');
    }
    const story = await this.storyRepository.save(
      {...data, status: 'Active', creator: user.userId}
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return await this.findOne(story.id);
  }

  /**
   * Get all stories
   * @returns {Promise<Story[]>}
   */
  async findAll(): Promise<Story[]> {
    const stories = await this.storyRepository
      .createQueryBuilder('S')
      .leftJoinAndSelect('S.comments', 'C')
      .leftJoinAndSelect('S.likes', 'L')
      .where('S.status <> :status', { status: 'Deleted'})
      .orderBy('S.creationDate', 'DESC')
      .addOrderBy('C.creationDate', 'DESC')
      .getMany();    
    return stories;
  }

  /**
   * Get story by id
   * @returns {Promise<Story>}
   */
  async findOne(id: number): Promise<Story>  {
    const story = await this.storyRepository
      .createQueryBuilder('S')
      .leftJoinAndSelect('S.comments', 'C')
      .leftJoinAndSelect('S.likes', 'L')
      .where('S.id = :id', { id })
      .andWhere('S.status <> :status', { status: 'Deleted'})
      .addOrderBy('C.creationDate', 'DESC')
      .getOneOrFail()
      .catch(() => {
        throw new InternalServerErrorException('Error al buscar la story por id');
      });
    return story;
  }

  /**
   * Update story
   * @param {UpdateStoryInput} data - data to create
   * @param {IUserReq} user - user logged
   * @returns {Promise<Story>}
   */
  async update(data: UpdateStoryInput, user: IUserReq): Promise<Story> {
    const story = await this.findOne(data.id);
    await this.storyRepository.update(
      {...data, modifier: user.userId}, story
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return await this.findOne(data.id);
  }

  /**
   * Like story
   * @param {CreateLikeStoryInput} data - data to create
   * @param {IUserReq} user - user logged
   * @returns {Promise<Story>}
   */
  async likeStory(data: CreateLikeStoryInput, user: IUserReq): Promise<Story> {
    const story = await this.findOne(data.idStory);
    delete story.comments;
    delete story.likes;
    const like = (Number(story.like) + 1);
    await this.storyRepository.save({...story, like}).catch((e) => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    await this.likeStoryService.create(data, user);
    return await this.findOne(data.idStory);
  }

  /**
   * Unlike story
   * @param {CreateLikeStoryInput} data - data to create
   * @param {IUserReq} user - user logged
   * @returns {Promise<Story>}
   */
  async unlikeStory(data: CreateLikeStoryInput, user: IUserReq): Promise<Story> {    
    const story = await this.findOne(data.idStory);
    await this.storyRepository.save(
      {
        ...story, 
        like: story.like === 0 ? 0 : Number(story.like) - 1
      }
    ).catch((e) => {
      console.log(e);
      
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    await this.likeStoryService.remove(data.idStory, user);
    return await this.findOne(data.idStory);
  }

  /**
   * Delete Story
   * @param {number} id - id story
   * @param {IUserReq} user - user logged
   * @returns {Promise<boolean>}
   */
  async remove(id: number, user: IUserReq): Promise<boolean> {
    const story = await this.findOne(id);
    await this.storyRepository.update(
      { status: 'Deleted'},
      story
    ).catch(() => {
        throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return true;
  }
}
