"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/dashboard/article-card";
import { ArticleForm } from "@/components/dashboard/article-form";
import { DeleteDialog } from "@/components/dashboard/delete-dialog";
import { SearchBar } from "@/components/dashboard/search-bar";
import { withAuth } from "@/components/withAuth";

const SAMPLE_ARTICLES = [
  {
    id: "1",
    title: "Mexico, Betting Trump Is Bluffing on Tariffs, Sees an Opportunity",
    description:
      "Business leaders in Mexico say President-elect Trump's new administration will enhance the appeal of their factories as an alternative to plants in China.",
    readingTime: "6 min",
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageCredit: "Alejandro Cegarra for The New York Times",
  },
  {
    id: "2",
    title: "The Future of Sustainable Energy",
    description:
      "Exploring the latest innovations in renewable energy and their impact on global climate change initiatives.",
    readingTime: "8 min",
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageCredit: "Energy Today",
  },
  {
    id: "3",
    title: "Digital Transformation in Healthcare",
    description:
      "How technological advancements are revolutionizing patient care and medical procedures in the modern era.",
    readingTime: "5 min",
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageCredit: "Health Tech Magazine",
  },
];

function ArticlesPage() {
  const [articles, setArticles] = useState(SAMPLE_ARTICLES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreate = (data: any) => {
    setArticles([...articles, { ...data, id: Date.now().toString() }]);
    setIsFormOpen(false);
  };

  const handleEdit = (id: string) => {
    const article = articles.find((a) => a.id === id);
    setEditingArticle(article);
    setIsFormOpen(true);
  };

  const handleUpdate = (data: any) => {
    setArticles(
      articles.map((article) =>
        article.id === editingArticle.id ? { ...data, id: article.id } : article
      )
    );
    setEditingArticle(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setDeleteArticleId(id);
  };

  const confirmDelete = () => {
    if (deleteArticleId) {
      setArticles(articles.filter((article) => article.id !== deleteArticleId));
      setDeleteArticleId(null);
    }
  };

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Articles
            </h1>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </div>

          <div className="w-full flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title or description..."
            />
          </div>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-h-[90vh] overflow-y-auto">
              <ArticleForm
                initialData={editingArticle}
                onSubmit={editingArticle ? handleUpdate : handleCreate}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingArticle(null);
                }}
              />
            </div>
          </div>
        )}

        <DeleteDialog
          isOpen={!!deleteArticleId}
          onClose={() => setDeleteArticleId(null)}
          onConfirm={confirmDelete}
        />

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No articles found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                {...article}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(ArticlesPage);
