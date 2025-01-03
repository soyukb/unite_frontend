'use client'

import { memo } from 'react'
import { motion } from "framer-motion"

function LoadingDotsComponent() {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: dot * 0.2
          }}
          className="w-1.5 h-1.5 bg-current rounded-full"
        />
      ))}
    </div>
  )
}

export default memo(LoadingDotsComponent)

