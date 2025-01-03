export interface Media {
  media_type: string
  media_url: string
}

export interface Post {
  post_id: number
  content: string
  content_translated: string
  media: Media[]
  thingid: string
  depth: number
  parentid: string
  created_at: string
  likes: number
}

export interface Thread {
  article_id: number
  title: string
  title_translated: string
  source_url: string
  category: string[]
  published_at: string | null
  comment_count: number
  is_published: boolean
  media: Media[]
  posts: Post[]
}

export type PostWithReplies = Post & {
  replies?: Post[]
}

