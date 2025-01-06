import { Skeleton } from "@/components/ui/skeleton"

export function ArticleSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-[1fr,auto] items-start border-b border-gray-200 pb-6 sm:pb-8">
      <div className="space-y-2 sm:space-y-3 order-2 sm:order-1">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="order-1 sm:order-2 w-full sm:w-[200px] md:w-[300px] lg:w-[400px] aspect-[4/3] rounded-lg" />
    </div>
  )
}

