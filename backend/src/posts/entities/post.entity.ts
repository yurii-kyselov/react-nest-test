import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @ObjectIdColumn()
  id: string;
  @Column()
  creator: string;
  @Column()
  'dc:creator': string;
  @Column()
  title: string;
  @Column()
  link: string;
  @Column()
  content: string;
  @Column()
  contentSnippet: string;
  @Column()
  categories: string[];
  @Column()
  pubDate: string;
  @Column()
  isoDate: string;
}
