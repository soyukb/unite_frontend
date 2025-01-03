"use client";

import ThreadDiscussion from "./thread-discussion";
import type { Thread } from "@/ThreadView/types/thread";

const mockThread: Thread = {
  article_id: 7,
  title: "I just bought the chicken folks. Any tips???",
  title_translated: "チキンを買ったばかりです。何かアドバイスありますか？？？",
  source_url:
    "https://www.reddit.com/r/PokemonUnite/comments/1hrcffs/i_just_bought_the_chicken_folks_any_tips/",
  category: [],
  published_at: null,
  comment_count: 0,
  is_published: false,
  media: [
    {
      media_type: "image",
      media_url: "https://i.redd.it/s9s7vjes4gae1.jpeg",
    },
  ],
  posts: [
    {
      post_id: 1,
      content: "Cook well in the oven",
      content_translated: "オーブンでしっかり調理してください",
      media: [
        {
          media_type: "image",
          media_url:
            "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=600",
        },
      ],
      thingid: "m4wlchu",
      depth: 0,
      parentid: "",
      created_at: "2025-01-02T06:04:54.728000+09:00",
      likes: 61,
    },
    {
      post_id: 2,
      content: "Chicken and waffles",
      content_translated: "「チキンとワッフル」",
      media: [
        {
          media_type: "image",
          media_url:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600",
        },
      ],
      thingid: "m4ym1ej",
      depth: 1,
      parentid: "t1_m4wlchu",
      created_at: "2022-03-12T09:00:00+09:00",
      likes: 3,
    },
    {
      post_id: 3,
      content: "Thanks👍❤️",
      content_translated: "ありがとう👍❤️",
      media: [],
      thingid: "m4wmbpy",
      depth: 1,
      parentid: "t1_m4wlchu",
      created_at: "2025-01-02T06:10:09.153000+09:00",
      likes: 4,
    },
    {
      post_id: 4,
      content:
        "Basically, how blaziken works: when you reach level 8, you will have blaze kick, overheat, and your unite move...",
      content_translated:
        "基本的に、バシャーモの使い方は以下の通りです。レベル8に達すると、ブレイズキック、オーバーヒート、ユナイト技が使えるようになります...",
      media: [
        {
          media_type: "video",
          media_url:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
      ],
      thingid: "m4wocgv",
      depth: 0,
      parentid: "",
      created_at: "2025-01-02T06:20:48.373000+09:00",
      likes: 33,
    },
    {
      post_id: 5,
      content: "It gets its unite move at level 8",
      content_translated: "レベル8でユナイト技を覚えます",
      media: [],
      thingid: "m4wqpve",
      depth: 1,
      parentid: "t1_m4wocgv",
      created_at: "2019-02-12T09:00:00+09:00",
      likes: 7,
    },
    {
      post_id: 6,
      content: "He did said that, or was it a change when I viewed this?",
      content_translated:
        "彼はそれを言っていたと思うけど、私が見た時には変わっていたのかな？",
      media: [
        {
          media_type: "image",
          media_url:
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600",
        },
      ],
      thingid: "m4xr0bg",
      depth: 2,
      parentid: "t1_m4wqpve",
      created_at: "2025-01-02T09:57:30.489000+09:00",
      likes: 8,
    },
  ],
};

function Page() {
  return <ThreadDiscussion thread={mockThread} />;
}

export default Page;
