// APIエンドポイント: src/pages/api/ に .ts ファイルを置くとAPIになる
// このファイルは /api/hello でアクセスできる（ファイルベースルーティング）

import type { APIRoute } from "astro";

// GETリクエストの処理
// /api/hello?name=太郎 → { message: "こんにちは、太郎さん！" }
export const GET: APIRoute = ({ url }) => {
  const name = url.searchParams.get("name") || "ゲスト";

  return new Response(
    JSON.stringify({ message: `こんにちは、${name}さん！` }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

// POSTリクエストの処理
// フォームやfetchからデータを受け取る
export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const name = data.name || "ゲスト";

  return new Response(
    JSON.stringify({
      message: `${name}さん、POSTリクエストを受け取りました！`,
      receivedAt: new Date().toLocaleTimeString("ja-JP"),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
