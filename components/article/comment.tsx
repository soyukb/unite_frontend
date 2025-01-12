"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CornerDownRight } from "lucide-react";
import { cn } from "../../lib/utils";
import LikeButton from "./like-button";
import MediaContent from "./media-content";
import useIntersectionObserver from "@/ThreadView/hooks/use-intersection-observer";
import type { Post } from "@/ThreadView/types/thread";

const fadeUpAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const slideLeftAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
};

function getCommentTextClass(likes: number) {
  if (likes >= 30) return "text-amber-600 dark:text-amber-400";
  if (likes >= 15) return "text-emerald-600 dark:text-emerald-400";
  if (likes >= 7) return "text-blue-600 dark:text-blue-400";
  return "text-foreground";
}

interface CommentProps {
  post: Post;
  index: number;
  posts: Post[];
}

function CommentComponent({ post, index, posts }: CommentProps) {
  const { ref, isVisible } = useIntersectionObserver();

  const { replyingTo, replyIndex } = useMemo(() => {
    if (!post.parentid) return { replyingTo: null, replyIndex: null };
    const replyingTo = posts.find((p) => `t1_${p.thingid}` === post.parentid);
    const replyIndex = replyingTo
      ? posts.findIndex((p) => p.thingid === replyingTo.thingid) + 1
      : null;
    return { replyingTo, replyIndex };
  }, [post.parentid, posts]);

  const textClass = useMemo(
    () => getCommentTextClass(post.likes),
    [post.likes]
  );

  return (
    <motion.div
      ref={ref}
      initial={fadeUpAnimation.initial}
      animate={isVisible ? fadeUpAnimation.animate : fadeUpAnimation.initial}
      transition={{ duration: 0.3, delay: isVisible ? index * 0.05 : 0 }}
    >
      <Card className="p-3 sm:p-4 transition-colors group border-none shadow-none hover:bg-muted/40">
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
          <div className="text-sm sm:text-base sm:min-w-[140px] text-muted-foreground">
            海外プレイヤー{index + 1}
          </div>
          <div className="flex-1 w-full sm:w-auto">
            {replyingTo && replyIndex && (
              <motion.div
                className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-2"
                initial={slideLeftAnimation.initial}
                animate={slideLeftAnimation.animate}
              >
                <CornerDownRight className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>
                  返信先:{" "}
                  <span className="text-muted-foreground hover:underline cursor-pointer">
                    海外プレイヤー{replyIndex}
                  </span>
                </span>
              </motion.div>
            )}
            <div
              className={cn(
                "text-base sm:text-lg whitespace-pre-line",
                textClass
              )}
            >
              {post.content_translated}
            </div>
            {post.media?.length > 0 && (
              <div className="space-y-2">
                {post.media.map((media, i) => (
                  <MediaContent
                    key={i}
                    type={media.media_type}
                    url={media.media_url}
                  />
                ))}
              </div>
            )}
            <div className="mt-2">
              <LikeButton initialLikes={post.likes} postId={post.post_id} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default memo(CommentComponent);
