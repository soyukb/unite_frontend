"use client";

import ThreadDiscussion from "@/components/article/thread-discussion";
import type { Thread } from "@/ThreadView/types/thread";
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "next/navigation";
import { use } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// // データフェッチ関数
// async function getThread(articleId: string): Promise<Thread> {
//   const response = await fetch(`${API_BASE_URL}/articles/${articleId}/`, {});

//   if (!response.ok) {
//     throw new Error("Failed to fetch thread data");
//   }

//   return response.json();
// }

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

type PageProps = {
  params: {
    id: string;
  };
};

export default function ArticlePage({ params }: PageProps) {
  const param = useParams();
  const id = param?.id;
  // const id = params.id;

  const [thread, setThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch thread data");
        }
        const data = await response.json();
        setThread(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!thread) {
    return <div>No thread data available</div>;
  }

  return (
    <div>
      <ThreadDiscussion thread={thread} />
    </div>
  );
}
