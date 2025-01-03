"use client";

import { memo } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ExternalLink, RssIcon as Reddit } from "lucide-react";
import { motion } from "framer-motion";
import MediaContent from "./media-content";
import { formatDate } from "@/ThreadView/utils/format-date";
import type { Thread } from "@/ThreadView/types/thread";

interface ThreadHeaderProps {
  thread: Thread;
}

function ThreadHeaderComponent({ thread }: ThreadHeaderProps) {
  return (
    <CardHeader className="space-y-1 border-b p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-3">
        <CardTitle className="text-xl sm:text-2xl leading-tight">
          {thread.title_translated}
        </CardTitle>
        <a
          href={thread.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
          aria-label="Redditで開く"
        >
          <Reddit className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          <span className="hidden sm:inline">View on Reddit</span>
          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
        {thread.published_at && (
          <time
            dateTime={thread.published_at}
            className="text-xs sm:text-sm text-muted-foreground tabular-nums"
          >
            {formatDate(thread.published_at)}
          </time>
        )}
        <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
          <span className="tabular-nums">コメント {thread.posts.length}件</span>
        </div>
        {thread.category?.length > 0 && (
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs sm:text-sm">
            {thread.category.join(", ")}
          </span>
        )}
      </div>
      {thread.media?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          {thread.media.map((media, i) => (
            <MediaContent
              key={i}
              type={media.media_type}
              url={media.media_url}
            />
          ))}
        </motion.div>
      )}
    </CardHeader>
  );
}

export default memo(ThreadHeaderComponent);
