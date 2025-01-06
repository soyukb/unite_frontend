export interface LoadingProps {
  isLoading: boolean
}

export interface ViewProps {
  view: "infinite" | "paginated"
}

export interface FilterProps {
  selectedCategory: string | null
  searchQuery: string
}

