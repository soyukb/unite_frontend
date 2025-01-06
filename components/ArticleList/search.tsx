"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from 'lucide-react'
import { useDebounce } from "./use-debounce"
import { useState, useCallback } from "react"

interface SearchProps {
  onSearch: (query: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [value, setValue] = useState("")
  const debouncedSearch = useDebounce(onSearch, 300)

  const handleSearch = useCallback((value: string) => {
    setValue(value)
    debouncedSearch(value)
  }, [debouncedSearch])

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search articles..."
        className="pl-9 w-full sm:w-[300px]"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}

