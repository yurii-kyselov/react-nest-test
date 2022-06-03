import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { TasksService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, TasksService],
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Post]),
    UsersModule,
  ],
  exports: [],
})
export class PostsModule {}
