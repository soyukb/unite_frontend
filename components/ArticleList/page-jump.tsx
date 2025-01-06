"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight } from 'lucide-react'

interface PageJumpProps {
  currentPage: number
  totalPages: number
  onJump: (page: number) => void
  disabled?: boolean
}

export function PageJump({ currentPage, totalPages, onJump, disabled }: PageJumpProps) {
  const [page, setPage] = useState(currentPage.toString())
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pageNumber = parseInt(page)
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onJump(pageNumber)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={disabled}
          className="flex"
        >
          Page {currentPage} of {totalPages}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ページジャンプ</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4">
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => setPage(e.target.value)}
            placeholder="Enter page number"
            className="w-full"
          />
          <Button type="submit" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

