import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'

interface ArticleCardProps {
  id: string
  title: string
  description: string
  readingTime: string
  imageUrl: string
  imageCredit?: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function ArticleCard({
  id,
  title,
  description,
  readingTime,
  imageUrl,
  imageCredit,
  onEdit,
  onDelete,
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden w-full max-w-md transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="p-4 sm:p-6">
          <Link href={`/articles/${id}`}>
            <h2 className="text-xl sm:text-2xl font-serif font-bold hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h2>
          </Link>
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>
          <p className="mt-2 text-gray-500 text-xs uppercase">{readingTime} read</p>
        </div>
        {imageUrl && (
          <div className="relative aspect-[16/9]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {imageCredit && (
              <span className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                {imageCredit}
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-wrap sm:flex-nowrap justify-end gap-2 bg-gray-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(id)}
          className="flex-1 sm:flex-none"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(id)}
          className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

