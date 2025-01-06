import { useState, useEffect, useCallback } from 'react'
import type { Article } from '@/types/article'
import { ITEMS_PER_PAGE, LOADING_DELAY_MS } from '@/constants'

interface UsePaginationProps {
  articles: Article[]
  view: 'infinite' | 'paginated'
}

export function usePagination({ articles, view }: UsePaginationProps) {
  const [page, setPage] = useState(1)
  const [visibleArticles, setVisibleArticles] = useState(articles.slice(0, ITEMS_PER_PAGE))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (view === "paginated") {
      setIsLoading(true)
      setTimeout(() => {
        setVisibleArticles(articles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE))
        setIsLoading(false)
      }, LOADING_DELAY_MS)
    }
  }, [page, view, articles])

  const loadMore = useCallback(() => {
    if (view === "infinite" && !isLoading) {
      setIsLoading(true)
      setTimeout(() => {
        if (visibleArticles.length < articles.length) {
          setVisibleArticles(prev => [
            ...prev,
            ...articles.slice(prev.length, prev.length + ITEMS_PER_PAGE)
          ])
        }
        setIsLoading(false)
      }, LOADING_DELAY_MS)
    }
  }, [view, isLoading, visibleArticles.length, articles])

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE)

  return {
    page,
    setPage,
    visibleArticles,
    isLoading,
    totalPages,
    loadMore
  }
}

