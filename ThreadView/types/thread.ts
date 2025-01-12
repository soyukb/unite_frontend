export interface Media {
  media_type: string;
  media_url: string;
}

export interface Category {
  category_id: number;
  category_name: string;
}

export interface Comment {
  comment_id: number;
  article: number;
  content: string;
  author: string | null;
  created_at: string; // ISO 8601 formatted date string
  parent_comment: number | null;
  likes: number;
  dislikes: number;
}

export interface Post {
  post_id: number;
  content: string;
  content_translated: string;
  media: Media[];
  thingid: string;
  depth: number;
  parentid: string;
  created_at: string;
  likes: number;
}

export interface Thread {
  article_id: number;
  title: string;
  title_translated: string;
  source_url: string;
  category: Category[];
  published_at: string | null;
  comment_count: number;
  comments: Comment[];
  is_published: boolean;
  media: Media[];
  posts: Post[];
}

export type PostWithReplies = Post & {
  replies?: Post[];
};
