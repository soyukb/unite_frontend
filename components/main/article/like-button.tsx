'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp } from 'lucide-react'

interface LikeButtonProps {
  initialLikes: number
}

export function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1)
      setHasLiked(true)
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 1000)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 text-sm transition-colors ${
          hasLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
        }`}
      >
        <ThumbsUp className={`h-4 w-4 transition-transform ${hasLiked ? 'scale-110' : ''}`} />
        <span>{likes}</span>
      </button>
      
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm whitespace-nowrap">
              +1
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

