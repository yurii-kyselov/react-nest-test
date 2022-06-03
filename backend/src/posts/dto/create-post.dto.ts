import Parser from 'rss-parser';
import { IsString, IsUrl } from 'class-validator';

export class CreatePostDto implements Parser.Item {
  @IsString()
  creator: string;
  @IsString()
  title: string;
  @IsUrl()
  link: string;
  @IsString()
  content: string;
  @IsString()
  contentSnippet: string;
  @IsString({ each: true })
  categories: string[];
}
