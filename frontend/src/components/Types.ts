export interface Post {
  id: string;
  creator: string;
  'dc:creator': string;
  title: string;
  link: string;
  content: string;
  contentSnippet: string;
  categories: string[];
  pubDate: string;
  isoDate: string;
}

export interface CreatePost {
  creator: string;
  title: string;
  link: string;
  content: string;
  contentSnippet: string;
  categories: string[];
}

export interface ChangePost {
  creator: string;
  title: string;
  link?: string;
  content: string;
  contentSnippet?: string;
  categories?: string[];
}

export interface PostProps {
  post: Post;
  editable: boolean;
  deleteFunc: (id: string) => Promise<void>;
  handleChangeModal?: (id: string, post: ChangePost) => void;
}
