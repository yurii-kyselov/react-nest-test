import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PostsService } from './posts.service';

@Injectable()
export class TasksService {
  constructor(private readonly postsService: PostsService) {}
  @Cron('0 */10 * * * *')
  async handleCron() {
    await this.postsService.createPostsFromRSS();
  }
}
