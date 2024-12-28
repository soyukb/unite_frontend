import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Article {
  id: string
  title: string
  description: string
  readTime: string
  image: {
    src: string
    credit: string
  }
  date?: string
  relatedArticles?: {
    title: string
    readTime: string
  }[]
}

const articles: Article[] = [
  {
    id: "1",
    title: "Rising Prices, Migrants and End of Covid Aid Fuel Rise in Homelessness",
    description: "The number of people experiencing homelessness topped 770,000, an increase of more than 18 percent over last year.",
    readTime: "4 MIN READ",
    image: {
      src: "/placeholder.svg?height=400&width=600",
      credit: "Rachel Bujalski for The New York Times"
    }
  },
  {
    id: "2",
    title: "Trump Urges Supreme Court to Pause TikTok Ban So He Can Weigh In",
    description: "President-elect Trump took no position on the app's First Amendment challenge to the law, which sets a Jan. 19 deadline to sell or close the popular platform.",
    readTime: "5 MIN READ",
    image: {
      src: "/placeholder.svg?height=400&width=600",
      credit: "Kent Nishimura for The New York Times"
    },
    date: "FROM NOVEMBER",
    relatedArticles: [
      {
        title: "Trump Raises TikTok's Hopes for a Rescue in the United States",
        readTime: "5 MIN READ"
      }
    ]
  }
]

export default function ArticleList() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6">
                <Link 
                  href="#" 
                  className="inline-block group"
                >
                  <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-blue-600">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">
                  {article.description}
                </p>
                <div className="text-sm text-gray-500">
                  {article.readTime}
                </div>
                {article.relatedArticles && (
                  <div className="mt-6 pt-6 border-t">
                    {article.date && (
                      <div className="text-xs font-semibold text-gray-600 mb-2">
                        {article.date}
                      </div>
                    )}
                    {article.relatedArticles.map((related, index) => (
                      <div key={index} className="mb-2">
                        <Link 
                          href="#" 
                          className="text-base font-serif font-bold hover:text-blue-600"
                        >
                          {related.title}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          {related.readTime}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative h-64 md:h-auto">
                <Image
                  src={article.image.src}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                  {article.image.credit}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

