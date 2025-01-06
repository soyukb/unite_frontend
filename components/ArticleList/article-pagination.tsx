import { memo } from 'react'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PageJump } from "./page-jump"
import type { LoadingProps } from "@/types/ui"

interface ArticlePaginationProps extends LoadingProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function ArticlePaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}: ArticlePaginationProps) {
  return (
    <motion.div 
      className="overflow-x-auto py-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Pagination>
          <PaginationContent className="min-w-max">
            <PaginationItem className="hidden sm:block">
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (!isLoading && currentPage > 1) onPageChange(currentPage - 1)
                }}
                isActive={currentPage > 1 && !isLoading}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (!isLoading) onPageChange(i + 1)
                  }}
                  isActive={currentPage === i + 1}
                  aria-label={`ページ ${i + 1} に移動`}
                  className={cn(
                    "text-sm transition-all",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className="hidden sm:block">
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (!isLoading && currentPage < totalPages) onPageChange(currentPage + 1)
                }}
                isActive={currentPage < totalPages && !isLoading}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <PageJump
          currentPage={currentPage}
          totalPages={totalPages}
          onJump={onPageChange}
          disabled={isLoading}
        />
      </div>
    </motion.div>
  )
}

export const ArticlePagination = memo(ArticlePaginationComponent)

