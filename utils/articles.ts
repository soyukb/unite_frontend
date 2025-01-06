import type { Article } from "@/types/article"

export function filterPublishedArticles(articles: Article[]): Article[] {
  return articles.filter(article => article.is_published)
}

