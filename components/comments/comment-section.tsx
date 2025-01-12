"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn, pulse } from "@/lib/utils";
import { toast } from "sonner";
import type { Comment, Thread } from "@/ThreadView/types/thread";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiComment {
  content: string;
  author: string | null;
  likes: number;
  dislikes: number;
  article: number;
  parent_comment: number | null;
}

async function postComment(comment: ApiComment) {
  const response = await fetch(`${API_BASE_URL}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error("コメントの投稿に失敗しました");
  }

  return await response.json();
}

async function updateLikes(commentId: number, likes: number) {
  const response = await fetch(`${API_BASE_URL}/comments/${commentId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes }),
  });

  if (!response.ok) {
    throw new Error("いいねの更新に失敗しました");
  }

  return await response.json();
}

async function updateDislikes(commentId: number, dislikes: number) {
  const response = await fetch(`${API_BASE_URL}/comments/${commentId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dislikes }),
  });

  if (!response.ok) {
    throw new Error("よくないの更新に失敗しました");
  }

  return await response.json();
}

function CommentComponent({
  comment,
  comments,
  onAddReply,
  onUpdateLikes,
  onUpdateDislikes,
  depth = 0,
}: {
  comment: Comment;
  comments: Comment[];
  onAddReply: (reply: Omit<Comment, "comment_id" | "created_at">) => void;
  onUpdateLikes: (commentId: number, newLikes: number) => void;
  onUpdateDislikes: (commentId: number, newDislikes: number) => void;
  depth?: number;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const replies = comments.filter(
    (c) => c.parent_comment === comment.comment_id
  );

  const handleLikeClick = () => {
    if (hasLiked) return;
    updateLikes(comment.comment_id, comment.likes + 1);
    onUpdateLikes(comment.comment_id, comment.likes + 1);
    setHasLiked(true);
    if (hasDisliked) {
      onUpdateDislikes(comment.comment_id, comment.dislikes - 1);
      setHasDisliked(false);
    }
  };

  const handleDislikeClick = () => {
    if (hasDisliked) return;
    updateDislikes(comment.comment_id, comment.dislikes + 1);
    onUpdateDislikes(comment.comment_id, comment.dislikes + 1);
    setHasDisliked(true);
    if (hasLiked) {
      onUpdateLikes(comment.comment_id, comment.likes - 1);
      setHasLiked(false);
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    onAddReply({
      content: replyContent.trim(),
      author: replyAuthor.trim() || null,
      parent_comment: comment.comment_id,
      likes: 0,
      dislikes: 0,
      article: comment.article,
    });

    setReplyContent("");
    setReplyAuthor("");
    setIsReplying(false);
    toast.success("返信を投稿しました");
  };

  return (
    <div className={`${depth > 0 ? "ml-6 pl-6 border-l border-gray-200" : ""}`}>
      <div className="group relative">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.author || "匿名"}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(parseISO(comment.created_at), {
                locale: ja,
              })}
              前
            </span>
          </div>
          <div className="text-sm leading-relaxed">{comment.content}</div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-2",
                hasLiked
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-muted-foreground hover:text-foreground",
                pulse
              )}
              onClick={handleLikeClick}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span className="text-xs">{comment.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-2",
                hasDisliked
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground hover:text-foreground",
                pulse
              )}
              onClick={handleDislikeClick}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              <span className="text-xs">{comment.dislikes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-2 text-muted-foreground hover:text-foreground",
                pulse
              )}
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              <span className="text-xs">返信</span>
            </Button>
          </div>

          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`reply-author-${comment.comment_id}`}>
                  名前（省略可）
                </Label>
                <Input
                  id={`reply-author-${comment.comment_id}`}
                  placeholder="名前を入力..."
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`reply-content-${comment.comment_id}`}>
                  返信内容
                </Label>
                <Textarea
                  id={`reply-content-${comment.comment_id}`}
                  placeholder="返信を入力..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReplying(false)}
                >
                  キャンセル
                </Button>
                <Button type="submit" size="sm">
                  返信する
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {replies.length > 0 && (
        <div className="mt-4">
          {replies.map((reply) => (
            <CommentComponent
              key={reply.comment_id}
              comment={reply}
              comments={comments}
              onAddReply={onAddReply}
              onUpdateLikes={onUpdateLikes}
              onUpdateDislikes={onUpdateDislikes}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentSectionProps {
  thread?: Thread;
}

export default function CommentSection({ thread }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(thread!.comments || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const content = formData.get("content") as string;
    if (!content?.trim()) return;

    const author = formData.get("author") as string;

    const newComment: Comment = {
      comment_id: Date.now(),
      article: thread!.article_id,
      content: content.trim(),
      author: author.trim() || null,
      created_at: new Date().toISOString(),
      parent_comment: null,
      likes: 0,
      dislikes: 0,
    };
    const apinewComment: ApiComment = {
      article: thread!.article_id,
      content: content.trim(),
      author: author.trim() || null,
      parent_comment: null,
      likes: 0,
      dislikes: 0,
    };
    postComment(apinewComment);
    setComments((prev) => [newComment, ...prev]);
    form.reset();
    toast.success("コメントを投稿しました");
  };

  const handleAddReply = (
    reply: Omit<Comment, "comment_id" | "created_at">
  ) => {
    const newReply: Comment = {
      comment_id: Date.now(),
      created_at: new Date().toISOString(),
      ...reply,
    };
    const apinewReply: ApiComment = {
      ...reply,
    };
    postComment(apinewReply);
    setComments((prev) => [...prev, newReply]);
  };

  const handleUpdateLikes = (commentId: number, newLikes: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.comment_id === commentId
          ? { ...comment, likes: newLikes }
          : comment
      )
    );
  };

  const handleUpdateDislikes = (commentId: number, newDislikes: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.comment_id === commentId
          ? { ...comment, dislikes: newDislikes }
          : comment
      )
    );
  };

  const rootComments = comments.filter(
    (comment) => comment.parent_comment === null
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">コメント</h2>
        <p className="text-sm text-muted-foreground">
          コメント一覧 ({comments.length}件)
        </p>
      </div>

      <div className="p-4">
        <div className="space-y-6">
          {rootComments.map((comment) => (
            <CommentComponent
              key={comment.comment_id}
              comment={comment}
              comments={comments}
              onAddReply={handleAddReply}
              onUpdateLikes={handleUpdateLikes}
              onUpdateDislikes={handleUpdateDislikes}
            />
          ))}
        </div>

        <Separator className="my-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="author">名前（省略可）</Label>
            <Input id="author" name="author" placeholder="名前を入力..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">コメント</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="コメントを入力..."
              className="min-h-[120px]"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className={pulse}>
              コメントする
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
