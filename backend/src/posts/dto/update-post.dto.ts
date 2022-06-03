import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @IsString()
  id: string;
  @IsOptional()
  @IsString()
  creator: string;
  @IsOptional()
  @IsString()
  'dc:creator': string;
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsUrl()
  link: string;
  @IsOptional()
  @IsString()
  content: string;
  @IsOptional()
  @IsString()
  contentSnippet: string;
  @IsOptional()
  @IsString({ each: true })
  categories: string[];
  @IsOptional()
  @IsString()
  pubDate: string;
  @IsOptional()
  @IsDateString()
  isoDate: string;
}
