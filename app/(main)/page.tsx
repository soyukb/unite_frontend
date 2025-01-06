// "use client";

// import ArticleFeed from "@/components/article-feed";
// import { articles } from "@/data/mock-articles";
// import { filterPublishedArticles } from "@/utils/articles";

// export default function SDage() {
//   // Filter published articles and sort by published_at
//   const sortedArticles = filterPublishedArticles([...articles]).sort((a, b) => {
//     if (!a.published_at) return 1;
//     if (!b.published_at) return -1;
//     return (
//       new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
//     );
//   });

//   return <ArticleFeed articles={sortedArticles} />;
// }
