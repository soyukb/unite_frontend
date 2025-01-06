"use client";

import ArticleFeed from "@/components/ArticleList/article-feed";
// import { articles } from "@/data/mock-articles";
import { Articles } from "@/types/article";
import { filterPublishedArticles } from "@/utils/articles";
import { useState, useEffect } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
  const [articles, setArticles] = useState<Articles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/listarticles/`);
        if (!response.ok) {
          throw new Error("Failed to fetch articles data");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!articles) {
    return <div>No thread data available</div>;
  }
  // Filter published articles and sort by published_at
  const sortedArticles = filterPublishedArticles([...articles]).sort((a, b) => {
    if (!a.published_at) return 1;
    if (!b.published_at) return -1;
    return (
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  });

  return <ArticleFeed articles={sortedArticles} />;
}
