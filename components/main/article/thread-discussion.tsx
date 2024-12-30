"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LikeButton } from "@/components/main/article/like-button";
import { MediaContent } from "@/components/main/article/media-content";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { Comment } from "@/types/comment";

function CommentComponent({
  comment,
  index,
}: {
  comment: Comment;
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: isVisible ? index * 0.1 : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Card className="p-3 sm:p-4 hover:bg-muted/50 transition-colors group">
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
          <div className="text-sm sm:text-base sm:min-w-[140px] font-medium">
            海外プレイヤー{comment.id}
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <div className="text-lg sm:text-xl text-foreground whitespace-pre-line">
              {comment.content}
            </div>
            {comment.media && (
              <MediaContent
                type={comment.media.type}
                url={comment.media.url}
                aspectRatio={comment.media.aspectRatio}
              />
            )}
            <motion.div
              className="mt-2 flex items-center gap-4"
              initial={false}
              transition={{ duration: 0.2 }}
            >
              <LikeButton initialLikes={comment.likes} />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function ThreadDiscussion() {
  const threadMedia = {
    type: "image" as const,
    url: "/placeholder.svg?height=450&width=800",
    aspectRatio: "video" as const,
  };

  const comments: Comment[] = [
    {
      id: 1,
      content: "NTHからは心の叫びが聞こえた。",
      likes: 124,
      media: {
        type: "image",
        url: "/placeholder.svg?height=400&width=800",
        aspectRatio: "video",
      },
    },
    {
      id: 2,
      content: "NTHのパフォーマンスあり得ないぞろ。凄すぎる。",
      likes: 89,
      media: {
        type: "gif",
        url: "/placeholder.svg?height=400&width=800",
        aspectRatio: "video",
      },
    },
    {
      id: 3,
      content:
        "この結果はNTHに相応しいな。剥き出しの才能のぶつかり合いだった。",
      likes: 67,
    },
    {
      id: 4,
      content:
        "これからに向けて最後にこれやっとこう。'//,\n日本のシーンの成長速度は尋常じゃないな。",
      likes: 156,
      media: {
        type: "image",
        url: "/placeholder.svg?height=800&width=800",
        aspectRatio: "square",
      },
    },
    {
      id: 5,
      content:
        ">>海外プレイヤー4\n確かに日本のレベルは上がってるけど、NTHは去年のLCQから強かったよ。今年のステージ1では単純に新ロスターの目が浅かっただけ。",
      likes: 92,
    },
  ];

  return (
    <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="space-y-1 border-b p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl mb-3 sm:mb-4">
              ZETA DIVISION vs NORTHEPTION 試合後スレッド
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              <time dateTime="2024-01-15">2024年1月15日</time>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>コメント 5件</span>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs sm:text-sm">
                Reddit
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              <MediaContent
                type={threadMedia.type}
                url={threadMedia.url}
                aspectRatio={threadMedia.aspectRatio}
              />
            </motion.div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 pb-2 border-b">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                海外の反応
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {comments.map((comment, index) => (
                  <CommentComponent
                    key={comment.id}
                    comment={comment}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
