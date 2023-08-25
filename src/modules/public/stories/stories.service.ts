import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStoryInput } from './dto/create-story.input';
import { UpdateStoryInput } from './dto/update-story.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Not, Repository } from 'typeorm';
import { IUserReq } from 'src/common/interfaces/user-req.interface';

@Injectable()
export class StoriesService {

  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
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
   * Delete Story
   * @param {number} id - id story
   * @param {IUserReq} user - user logged
   * @returns {Promise<boolean>}
   */
  async remove(id: number, user: IUserReq): Promise<boolean> {
    const story = await this.findOne(id);
    await this.storyRepository.delete(
      {id: story.id, creator: user.userId}
    ).catch(() => {
        throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return true;
  }
}
