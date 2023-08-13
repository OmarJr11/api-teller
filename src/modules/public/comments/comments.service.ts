import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Not, Repository } from 'typeorm';
import { StoriesService } from '../stories/stories.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private _storyService: StoriesService,
  ) {}

  /**
   * Create Story
   * @param {CreateCommentInput} data - data to create
   * @returns {Promise<Comment>}
   */
  async create(data: CreateCommentInput): Promise<Comment> {
    await this._storyService.findOne(data.idStory);
    if(!data.text || data.text.length < 3 ) {
      throw new ForbiddenException('Text must be exist');
    }

    const comment = await this.commentRepository.save(
      {...data, status: 'Activate'}
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return await this.findOne(comment.id);
  }

  /**
   * Get all Comments
   * @returns {Promise<Comment[]>}
   */
  async findAll(): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: {
        status: Not('Deleted')
      },
      order: { creationDate: "DESC", }
    });
    return comments;
  }

  /**
   * Find comment by id
   * @param {number} id 
   * @returns {Promise<Comment>}
   */
  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneOrFail({
      where: {
        id,
        status: Not('Deleted')
      }
    }).catch(() => {
      throw new InternalServerErrorException('Error al buscar el comentario por id');
    });
    return comment;
  }

  /**
   * Update comment
   * @param {UpdateStoryInput} data 
   * @returns {Promise<Comment>}
   */
  async update(data: UpdateCommentInput): Promise<Comment> {
    await this._storyService.findOne(data.idStory);
    const comment = await this.findOne(data.id);
    await this.commentRepository.update(
      data, comment
    ).catch(() => {
      throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return await this.findOne(data.id);
  }

  /**
   * Delete comment
   * @param {number} id - id story
   * @returns {Promise<boolean>}
   */
  async remove(id: number): Promise<boolean> {
    const comment = await this.findOne(id);
    await this.commentRepository.delete(
      {id: comment.id}
    ).catch(() => {
        throw new InternalServerErrorException('Ha ocurrido un error, intente de nuevo')
    });
    return true;
  }
}
