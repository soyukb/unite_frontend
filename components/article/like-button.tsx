"use client";

import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import LoadingDots from "./loading-dots";
import { cn } from "../../lib/utils";

interface LikeButtonProps {
  initialLikes: number;
}

function LikeButtonComponent({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
    }

    setIsLoading(false);
  }, [hasLiked, isLoading]);

  return (
    <div className="relative">
      <motion.button
        onClick={handleLike}
        disabled={isLoading}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center gap-1.5 text-sm rounded-full px-3 py-1.5",
          "transition-all duration-200 ease-in-out",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "disabled:pointer-events-none",
          hasLiked
            ? "text-red-500 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30"
            : "text-muted-foreground hover:text-primary hover:bg-muted",
          isLoading && "opacity-70 cursor-not-allowed"
        )}
        aria-label={hasLiked ? "いいねを解除" : "いいねする"}
      >
        <motion.div
          animate={
            hasLiked
              ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0],
                }
              : undefined
          }
          transition={{ duration: 0.4 }}
        >
          <ThumbsUp
            className={cn(
              "h-4 w-4 transition-all duration-200",
              hasLiked && "fill-red-500"
            )}
          />
        </motion.div>
        <motion.span
          key={likes}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="tabular-nums"
        >
          {isLoading ? <LoadingDots /> : likes}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: -20,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm whitespace-nowrap shadow-lg">
              +1
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(LikeButtonComponent);
