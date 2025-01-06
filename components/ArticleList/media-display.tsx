"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface MediaDisplayProps {
  url: string
  width: number
  height: number
  priority?: boolean
  startTime?: number
  endTime?: number
}

export function MediaDisplay({ 
  url, 
  width, 
  height, 
  priority = false,
  startTime = 0,
  endTime = 10
}: MediaDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const fileType = url.split('.').pop()?.toLowerCase()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      if (startTime) {
        video.currentTime = startTime
      }
      video.play().catch(console.error)
    }

    const handleTimeUpdate = () => {
      if (endTime && video.currentTime >= endTime) {
        video.currentTime = startTime
        video.play().catch(console.error)
      }
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [startTime, endTime])

  if (fileType === 'mp4') {
    return (
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full sm:w-[200px] md:w-[300px] lg:w-[400px] aspect-[4/3] object-cover rounded-lg"
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
        >
          <source src={url} type="video/mp4" />
        </video>
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <Image
        src={imageError ? "/placeholder.svg?height=300&width=400" : url}
        alt=""
        width={width}
        height={height}
        className="w-full sm:w-[200px] md:w-[300px] lg:w-[400px] aspect-[4/3] object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
        priority={priority}
        unoptimized={fileType === 'gif'}
        onError={() => setImageError(true)}
      />
    </div>
  )
}

