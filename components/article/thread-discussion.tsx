"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/article/error-boundary";
import type { Thread } from "@/ThreadView/types/thread";

const Comment = dynamic(() => import("@/components/article/comment"));
const ThreadHeader = dynamic(
  () => import("@/components/article/thread-header")
);

interface ThreadDiscussionProps {
  thread: Thread;
}

function ThreadDiscussionComponent({ thread }: ThreadDiscussionProps) {
  if (!thread) {
    return (
      <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
        <Card className="max-w-4xl mx-auto border-none shadow-none">
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-muted-foreground">
              スレッドが見つかりませんでした。
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
      <ErrorBoundary>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="max-w-4xl mx-auto border-none shadow-none">
            <ThreadHeader thread={thread} />
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between gap-4 pb-2 border-b">
                  <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <MessageSquare
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      aria-hidden="true"
                    />
                    海外の反応
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Redditより転載
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {thread.posts.map((post, index) => (
                    <Comment
                      key={post.thingid}
                      post={post}
                      index={index}
                      posts={thread.posts}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </ErrorBoundary>
    </div>
  );
}

export default memo(ThreadDiscussionComponent);
