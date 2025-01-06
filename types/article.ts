interface Media {
  media_type: string;
  media_url: string;
}

export interface Article {
  article_id: number;
  title: string;
  title_translated: string;
  source_url: string;
  category:
    | {
        category_id: number;
        category_name: string;
      }[]
    | [];
  published_at: string | null;
  comment_count: number;
  is_published: boolean;
  media: Media[];
}

export type Articles = Article[];
