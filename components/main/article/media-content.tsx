import Image from "next/image"
import { cn } from "@/lib/utils"

interface MediaContentProps {
  type: 'image' | 'gif'
  url: string
  aspectRatio?: 'square' | 'video' | 'wide'
}

export function MediaContent({ type, url, aspectRatio = 'video' }: MediaContentProps) {
  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[2/1]'
  }[aspectRatio]

  return (
    <div className={cn(
      "w-full rounded-md sm:rounded-lg overflow-hidden bg-muted my-2 sm:my-3",
      aspectRatioClass
    )}>
      <Image
        src={url}
        alt={type === 'gif' ? "アニメーションGIF" : "投稿画像"}
        width={800}
        height={450}
        className="w-full h-full object-cover"
        unoptimized={type === 'gif'}
      />
    </div>
  )
}

