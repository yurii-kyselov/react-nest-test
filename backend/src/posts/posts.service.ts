import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Like, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import * as Parser from 'rss-parser';
import { CreatePostDto } from './dto/create-post.dto';

interface PostsParams {
  take?: string;
  skip?: string;
  orderField?: string;
  order?: 'ASC' | 'DESC';
  searchField?: string;
  search?: string;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(post: CreatePostDto) {
    const newPost = new Post();

    newPost.creator = post.creator;
    newPost['dc:creator'] = post.creator;
    newPost.title = post.title;
    newPost.link = post.link;
    newPost.content = post.content;
    newPost.contentSnippet = post.contentSnippet;
    newPost.categories = post.categories;
    newPost.pubDate = new Date(Date.now()).toUTCString();
    newPost.isoDate = new Date(Date.now()).toISOString();

    const createdPost = this.postsRepository.create(newPost);
    return this.postsRepository.save(createdPost);
  }

  async createPostsFromRSS() {
    const rssPosts = await this.getRSS();
    const postsToSave: Array<Post> = [];

    for (const post of rssPosts) {
      const newPost = plainToClass(Post, post);
      if (
        await this.postsRepository.findOne({
          where: { title: newPost.title },
        })
      ) {
        break;
      }
      postsToSave.push(newPost);
    }

    return await this.postsRepository.save(
      this.postsRepository.create(postsToSave),
    );
  }

  async findAll(params: PostsParams): Promise<[Post[], number]> {
    return await this.postsRepository.findAndCount({
      where: params.search
        ? { [params.searchField]: new RegExp(`${params.search}`, 'i') }
        : {},
      order: {
        [params.orderField]: params.order,
      },
      skip: parseInt(params.skip),
      take: parseInt(params.take),
    });
  }

  // async findAll(): Promise<Post[]> {
  //   return await this.postsRepository.find();
  // }

  async findOne(id: string) {
    return await this.postsRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: string) {
    return await this.postsRepository.delete(id);
  }

  private async getRSS() {
    const parser = new Parser();
    const feed = await parser.parseURL('https://lifehacker.com/rss');

    return feed.items;
  }
}
