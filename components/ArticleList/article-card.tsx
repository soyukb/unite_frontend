import { memo } from "react";
import Link from "next/link";
import { MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaDisplay } from "./media-display";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/date";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  index: number;
  onCategoryClick: (category: string) => void;
}

function ArticleCardComponent({
  article,
  index,
  onCategoryClick,
}: ArticleCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05,
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.05 + 0.2,
      },
    },
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={cn(
        "grid gap-4 sm:gap-6",
        "grid-cols-1 sm:grid-cols-[1fr,auto]",
        "items-start rounded-lg p-2"
      )}
      tabIndex={-1}
    >
      <div className="space-y-2 sm:space-y-3 order-2 sm:order-1">
        <Link
          href={`/article/${article.article_id}`}
          className="block group focus:outline-none"
          tabIndex={0}
          // target="_blank"
          rel="noopener noreferrer"
        >
          <h2
            className="text-xl sm:text-2xl font-bold leading-tight group-hover:text-blue-600 group-focus:text-blue-600"
            style={{
              fontFamily: '"Hiragino Kaku Gothic Pro", "Yu Gothic", sans-serif',
            }}
          >
            {article.title_translated}
          </h2>
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {article.category.length > 0 ? (
            article.category.map((cat) => (
              <Button
                key={cat.category_id}
                variant="secondary"
                size="sm"
                className="hover:bg-secondary/80 transition-colors"
                onClick={() => onCategoryClick(cat.category_name)}
              >
                {cat.category_name}
              </Button>
            ))
          ) : (
            <Badge variant="secondary" className="bg-muted">
              カテゴリなし
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <time dateTime={article.published_at || ""}>
              {formatDate(article.published_at)}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{article.comment_count}</span>
          </div>
        </div>
      </div>
      <motion.div
        className="relative order-1 sm:order-2 group"
        variants={imageVariants}
      >
        {article.media.length > 0 && (
          <MediaDisplay
            url={article.media[0].media_url}
            width={400}
            height={300}
            priority={index === 0}
            startTime={0}
            endTime={10}
          />
        )}
      </motion.div>
    </motion.article>
  );
}

export const ArticleCard = memo(ArticleCardComponent);
