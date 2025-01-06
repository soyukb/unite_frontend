"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListIcon, ScrollIcon } from 'lucide-react'

interface ViewToggleProps {
  view: "infinite" | "paginated"
  onViewChange: (view: "infinite" | "paginated") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <Tabs value={view} onValueChange={(value) => onViewChange(value as "infinite" | "paginated")}>
      <TabsList className="grid w-full sm:w-48 grid-cols-2">
        <TabsTrigger value="infinite" className="flex items-center gap-2">
          <ScrollIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Infinite</span>
        </TabsTrigger>
        <TabsTrigger value="paginated" className="flex items-center gap-2">
          <ListIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Pages</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

