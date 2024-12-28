import { Card } from "@/components/ui/card"

interface Post {
  id: number
  username: string
  timestamp: string
  postId: string
  content: string
  reference?: string
}

export default function ForumPosts() {
  const posts: Post[] = [
    {
      id: 14,
      username: "それでも動く名無し",
      timestamp: "2024/12/26(木) 01:42:28.10",
      postId: "daRy2ueo0",
      content: "東大野球部はなんでで弱いの"
    },
    {
      id: 16,
      username: "それでも動く名無し",
      timestamp: "2024/12/26(木) 01:44:00.45",
      postId: "dFfG0g0v0",
      content: "努力不足の低学歴が親になんかなったらあかんわ\n\n親が怠け者なのに子供が努力するわけないし、そもそも子供に努力を押し付けていい立場の人間じゃあない\n\n馬鹿かましいよ\n徹底過ぎる"
    },
    {
      id: 57,
      username: "それでも動く名無し",
      timestamp: "2024/12/26(木) 03:34:09.49",
      postId: "sZRBljyv0",
      content: ">>16\n親が中卒なのに子供に進学校通わせるとか意味不明よな",
      reference: "16"
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-4 space-y-2">
          <div className="flex items-baseline gap-2 text-sm">
            <span className="font-medium">{post.id}:</span>
            <span className="text-green-600">{post.username}</span>
            <span className="text-gray-600">{post.timestamp}</span>
            <span className="text-gray-500">ID:{post.postId}</span>
          </div>
          <div className="whitespace-pre-wrap">
            {post.reference && (
              <span className="text-blue-600 hover:underline cursor-pointer">
                {">>"}{post.reference}
              </span>
            )}
            {post.content}
          </div>
        </Card>
      ))}
    </div>
  )
}

