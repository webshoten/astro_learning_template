import type { APIRoute } from "astro";

export const POST: APIRoute = () => {
  // ログイン成功 → Cookie をセットして /protected にリダイレクト
  // 本物の認証では ここでパスワード検証などを行う
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/protected",
      // auth=true というCookieをブラウザに保存させる
      "Set-Cookie": "auth=true; Path=/; HttpOnly",
    },
  });
};
