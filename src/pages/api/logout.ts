import type { APIRoute } from "astro";

export const POST: APIRoute = () => {
  // ログアウト → Cookie を削除して /login にリダイレクト
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/login",
      // Max-Age=0 にすると即座にCookieが削除される
      "Set-Cookie": "auth=true; Path=/; HttpOnly; Max-Age=0",
    },
  });
};
