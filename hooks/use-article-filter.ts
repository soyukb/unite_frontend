import { useState, useCallback, useMemo } from 'react'
import type { Article } from '@/types/article'
import { ITEMS_PER_PAGE, LOADING_DELAY_MS } from '@/constants'

export function useArticleFilter(articles: Article[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const filteredArticles = useMemo(() => {
    if (!searchQuery && !selectedCategory) return articles

    return articles.filter(article => {
      if (selectedCategory) {
        return article.category.includes(selectedCategory)
      }
      
      return (
        article.title_translated.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.join('').toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [articles, searchQuery, selectedCategory])

  const handleSearch = useCallback((query: string) => {
    setIsSearching(true)
    setSearchQuery(query)
    setSelectedCategory(null)
    
    setTimeout(() => {
      setIsSearching(false)
    }, LOADING_DELAY_MS)
  }, [])

  const handleCategoryClick = useCallback((category: string) => {
    setIsSearching(true)
    setSearchQuery("")
    setSelectedCategory(category)
    
    setTimeout(() => {
      setIsSearching(false)
    }, LOADING_DELAY_MS)
  }, [])

  const clearFilters = useCallback(() => {
    setIsSearching(true)
    setSearchQuery("")
    setSelectedCategory(null)
    
    setTimeout(() => {
      setIsSearching(false)
    }, LOADING_DELAY_MS)
  }, [])

  return {
    filteredArticles,
    searchQuery,
    selectedCategory,
    isSearching,
    handleSearch,
    handleCategoryClick,
    clearFilters
  }
}

