import { Injectable } from '@nestjs/common';
import { CreateLikeStoryInput } from './dto/create-like-story.input';
import { UpdateLikeStoryInput } from './dto/update-like-story.input';

@Injectable()
export class LikeStoriesService {
  create(createLikeStoryInput: CreateLikeStoryInput) {
    return 'This action adds a new likeStory';
  }

  findAll() {
    return `This action returns all likeStories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likeStory`;
  }

  update(id: number, updateLikeStoryInput: UpdateLikeStoryInput) {
    return `This action updates a #${id} likeStory`;
  }

  remove(id: number) {
    return `This action removes a #${id} likeStory`;
  }
}
