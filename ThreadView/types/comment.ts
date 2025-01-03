export interface Comment {
  id: number
  content: string
  likes: number
  replyTo?: number
  media?: {
    type: 'image' | 'gif'
    url: string
    aspectRatio?: 'square' | 'video' | 'wide'
  }
}

