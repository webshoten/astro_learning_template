import { defineMiddleware } from "astro:middleware";

// 認証が必要なパスの一覧
const PROTECTED_PATHS = ["/protected"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const pathname = new URL(request.url).pathname;

  console.log(`[MW] ${request.method} ${pathname}`);

  context.locals.requestId = crypto.randomUUID();
  context.locals.visitedAt = new Date().toLocaleTimeString("ja-JP");

  // アクセス制御: 保護されたパスへのリクエストをチェック
  if (PROTECTED_PATHS.includes(pathname)) {
    const cookie = request.headers.get("cookie") ?? "";
    const isLoggedIn = cookie.includes("auth=true");

    if (!isLoggedIn) {
      // 未ログイン → /login にリダイレクト
      console.log(`[MW] 未認証のアクセスをブロック: ${pathname}`);
      return context.redirect("/login");
    }
  }

  const response = await next();

  console.log(`[MW] レスポンス: ${response.status}`);

  return response;
});
