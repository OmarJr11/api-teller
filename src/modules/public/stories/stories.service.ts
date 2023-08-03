import { ForbiddenException, Injectable } from '@nestjs/common';
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
  
  async createStory(data: CreateStoryInput) {    
    if(!data.text ||!data.title) {
      throw new ForbiddenException('Title and text must be exist');
    }
    const story = await this.storyRepository.save({...data, status: 'Activate'});
    return await this.findOne(story.id);
  }

  async findAll(): Promise<Story[]> {
    const stories = await this.storyRepository.find({
      where: {
        status: Not('Deleted')
      }
    });
    return stories;
  }

  async findOne(id: number) {
    const story = await this.storyRepository.findOneOrFail({
      where: {
        id,
        status: Not('Deleted')
      }
    }).catch(() => {
      throw new ForbiddenException('Error al buscar story por id');
    });
    return story;
  }

  update(id: number, updateStoryInput: UpdateStoryInput) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
