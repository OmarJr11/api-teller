import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStoryInput } from './dto/create-story.input';
import { UpdateStoryInput } from './dto/update-story.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class StoriesService {

  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
  ) {}
  
  /**
   * Create Story
   * @param {CreateStoryInput} data - data to create
   * @returns {Promise<Story>}
   */
  async createStory(data: CreateStoryInput): Promise<Story> {    
    if(!data.text || !data.title) {
      throw new ForbiddenException('Title and text must be exist');
    }
    const story = await this.storyRepository.save(
      {...data, status: 'Active'}
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
   * @returns {Promise<Story>}
   */
  async update(data: UpdateStoryInput): Promise<Story> {
    const story = await this.findOne(data.id);
    await this.storyRepository.update(
      data, story
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return await this.findOne(data.id);
  }

  /**
   * Delete Story
   * @param {number} id - id story
   * @returns {Promise<boolean>}
   */
  async remove(id: number): Promise<boolean> {
    const story = await this.findOne(id);
    await this.storyRepository.delete(
      {id: story.id}
    ).catch(() => {
        throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return true;
  }
}
