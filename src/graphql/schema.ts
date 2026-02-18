import { createSchema } from "graphql-yoga";

// GraphQLスキーマ定義
// typeDefs: データの型（何を取得できるか）
// resolvers: 実際のデータ取得ロジック（どうやって返すか）
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello(name: String): String!
      posts: [Post!]!
      post(id: String!): Post
    }

    type Post {
      id: String!
      title: String!
      date: String!
      body: String!
    }
  `,
  resolvers: {
    Query: {
      // hello(name: "太郎") → "こんにちは、太郎さん！"
      hello: (_, { name }) => `こんにちは、${name || "ゲスト"}さん！`,

      // posts → 全記事を返す
      posts: () => MOCK_POSTS,

      // post(id: "first-post") → 1件の記事を返す
      post: (_, { id }) => MOCK_POSTS.find((p) => p.id === id) || null,
    },
  },
});

// 学習用のモックデータ（本来はDBやCMSから取得する）
const MOCK_POSTS = [
  {
    id: "first-post",
    title: "はじめての投稿",
    date: "2026-02-17",
    body: "Astroでブログを作る練習をしています。",
  },
  {
    id: "second-post",
    title: "コンポーネントについて",
    date: "2026-02-17",
    body: "Astroのコンポーネントは .astro ファイルで作る。",
  },
];
