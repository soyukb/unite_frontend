import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <motion.div
      className="flex items-center gap-2 text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>記事を読み込み中...</span>
    </motion.div>
  );
}

export function NoResults({
  category,
  query,
}: {
  category?: string | null;
  query?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-8 text-muted-foreground"
    >
      記事が見つかりません{" "}
      {category
        ? `カテゴリ "${category}"`
        : query
        ? `検索ワード "${query}"`
        : ""}
    </motion.div>
  );
}
