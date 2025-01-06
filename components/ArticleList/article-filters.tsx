import { memo } from 'react'
import { X } from 'lucide-react'
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search } from "./search"
import { ViewToggle } from "./view-toggle"
import type { FilterProps, ViewProps } from "@/types/ui"

interface ArticleFiltersProps extends FilterProps, ViewProps {
  onSearch: (query: string) => void
  onClearFilters: () => void
  onViewChange: (view: "infinite" | "paginated") => void
}

function ArticleFiltersComponent({
  selectedCategory,
  searchQuery,
  view,
  onSearch,
  onClearFilters,
  onViewChange
}: ArticleFiltersProps) {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <Search onSearch={onSearch} />
        {(selectedCategory || searchQuery) && (
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <Badge variant="secondary">
                Category: {selectedCategory}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary">
                Search: {searchQuery}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearFilters}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <ViewToggle view={view} onViewChange={onViewChange} />
    </motion.div>
  )
}

export const ArticleFilters = memo(ArticleFiltersComponent)

