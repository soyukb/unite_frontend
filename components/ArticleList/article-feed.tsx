"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence } from "framer-motion";
import { ArticleCard } from "./article-card";
import { ArticleSkeleton } from "./article-skeleton";
import { ArticleFilters } from "./article-filters";
import { ArticlePagination } from "./article-pagination";
import { LoadingSpinner, NoResults } from "./loading-states";
import { useArticleFilter } from "@/hooks/use-article-filter";
import { usePagination } from "@/hooks/use-pagination";
import { ITEMS_PER_PAGE } from "@/constants";
import type { Article } from "@/types/article";

interface ArticleFeedProps {
  articles: Article[];
}

export default function ArticleFeed({ articles }: ArticleFeedProps) {
  const [view, setView] = useState<"infinite" | "paginated">("infinite");
  const { ref: loadMoreRef, inView } = useInView();

  const {
    filteredArticles,
    searchQuery,
    selectedCategory,
    isSearching,
    handleSearch,
    handleCategoryClick,
    clearFilters,
  } = useArticleFilter(articles);

  const { page, setPage, visibleArticles, isLoading, totalPages, loadMore } =
    usePagination({
      articles: filteredArticles,
      view,
    });

  const handleViewChange = useCallback((newView: "infinite" | "paginated") => {
    setView(newView);
  }, []);

  useEffect(() => {
    if (view === "infinite" && inView) {
      loadMore();
    }
  }, [view, inView, loadMore]);

  const articleList = useMemo(
    () =>
      visibleArticles.map((article, index) => (
        <ArticleCard
          key={article.article_id}
          article={article}
          index={index}
          onCategoryClick={handleCategoryClick}
        />
      )),
    [visibleArticles, handleCategoryClick]
  );

  const skeletons = useMemo(
    () =>
      Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <ArticleSkeleton key={`skeleton-${i}`} />
      )),
    []
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">
      <ArticleFilters
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        view={view}
        onSearch={handleSearch}
        onClearFilters={clearFilters}
        onViewChange={handleViewChange}
      />

      <div className="space-y-6 sm:space-y-8">
        <AnimatePresence mode="wait">
          {(isLoading && view === "paginated") || isSearching ? (
            skeletons
          ) : visibleArticles.length > 0 ? (
            articleList
          ) : (
            <NoResults category={selectedCategory} query={searchQuery} />
          )}
        </AnimatePresence>
      </div>

      {view === "infinite" &&
        (visibleArticles.length < filteredArticles.length || isLoading) && (
          <div ref={loadMoreRef} className="flex justify-center py-8">
            {isLoading && <LoadingSpinner />}
          </div>
        )}

      {view === "paginated" && filteredArticles.length > 0 && (
        <ArticlePagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
