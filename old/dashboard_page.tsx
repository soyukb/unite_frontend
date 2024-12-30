"use client";
import ArticleList from "@/components/main/article-list";
import { withAuth } from "@/components/withAuth";

function Dashboard() {
  return (
    <div>
      <ArticleList />
    </div>
  );
}

export default withAuth(Dashboard);