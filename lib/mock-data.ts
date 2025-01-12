export interface Comment {
  comment_id: number
  article: number
  content: string
  author: string | null
  created_at: string
  parent_comment: number | null
  likes: number
  dislikes: number
}

export const mockComments: Comment[] = [
  {
    comment_id: 1,
    article: 19,
    content: "NTHが活躍して日本の枠が増えて欲しいけど、来年からはアジアでまとめて予選するとか聞いたからどうなるかめちゃくちゃ気になる。",
    author: "匿名",
    created_at: "2022-06-28T12:22:00+09:00",
    parent_comment: null,
    likes: 15,
    dislikes: 2,
  },
  {
    comment_id: 2,
    article: 19,
    content: "アジアが地域でまとめられるのは、枠も同じ数維持されて続計されるなら日本にとって+になる可能性もある。今現在のアジアは、日本1枠韓国1枠APAC2枠の計4枠だけど、韓国はぶっちゃけDrxがぶっさりのtopだし、APACもPRXが絶対王者みたいな立ち位置になってくと思う。",
    author: "匿名",
    created_at: "2022-06-28T20:49:00+09:00",
    parent_comment: 1,
    likes: 8,
    dislikes: 1,
  },
  {
    comment_id: 3,
    article: 19,
    content: "興行的にはZETA行ってほしかったけど決まったからにはノーセフも世界驚かせてほしいね それよりコペンハーゲンがSSAを超えられるかが楽しみだわ SSAくそ良くできてたがハードルすごいけど頑張れ",
    author: "匿名",
    created_at: "2022-06-28T12:23:00+09:00",
    parent_comment: null,
    likes: 12,
    dislikes: 3,
  },
]

