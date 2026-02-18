// GraphQLエンドポイント: /api/graphql
// graphql-yoga がリクエストを処理してくれる

import type { APIRoute } from "astro";
import { createYoga } from "graphql-yoga";
import { schema } from "../../graphql/schema";

// graphql-yoga のインスタンスを作成
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});

// yogaのレスポンスをAstroが認識できるResponseに変換するヘルパー
async function handleYoga(request: Request): Promise<Response> {
  const response = await yoga.handle(request);
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

// GET/POST両方をyogaに委譲する
export const GET: APIRoute = async ({ request }) => {
  return handleYoga(request);
};

export const POST: APIRoute = async ({ request }) => {
  return handleYoga(request);
};
