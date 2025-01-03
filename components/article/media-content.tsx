'use client'

import { memo } from 'react'
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from 'react'

interface MediaContentProps {
  type: string
  url: string
  quality?: number
}

function MediaContentComponent({ type, url, quality = 75 }: MediaContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const isVideo = type === 'video'
  const isGif = type === 'gif'

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative w-full rounded-md sm:rounded-lg overflow-hidden bg-muted">
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10" />
      )}
      
      {isVideo ? (
        <video
          className="w-full aspect-video"
          controls
          preload="metadata"
          playsInline
          muted
          autoPlay
          loop
          onLoadedData={handleLoad}
        >
          <source src={url} type="video/mp4" />
          <p>お使いのブラウザは動画の再生に対応していません。</p>
        </video>
      ) : (
        <div className="w-full aspect-video">
          <Image
            src={url}
            alt={isGif ? "アニメーションGIF" : "投稿画像"}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            sizes="(min-width: 1280px) 1024px, (min-width: 768px) 768px, 100vw"
            quality={quality}
            unoptimized={isGif}
            priority={true}
            onLoad={handleLoad}
          />
        </div>
      )}
    </div>
  )
}

export default memo(MediaContentComponent)

