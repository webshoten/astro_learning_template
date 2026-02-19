# Astro 学習ノート

## セットアップ (2026-02-17)

### やったこと
1. `npm create astro@latest .` でプロジェクトを初期化
   - テンプレート: basic starter project
   - 依存関係: インストール済み
   - Git: 初期化済み

### プロジェクト構造
```
/
├── public/          ... 静的ファイル（そのまま配信される）
│   └── favicon.svg
├── src/
│   ├── assets/      ... 画像など（ビルド時に最適化される）
│   ├── components/  ... 再利用可能なコンポーネント
│   ├── layouts/     ... ページの共通レイアウト
│   └── pages/       ... ページ（ファイル = URL になる）
│       └── index.astro  → localhost:4321/
├── astro.config.mjs ... Astroの設定ファイル
├── package.json
└── tsconfig.json
```

### 基本コマンド
| コマンド | 説明 |
|:--|:--|
| `npm run dev` | 開発サーバー起動 (localhost:4321) |
| `npm run build` | 本番ビルド (`./dist/` に出力) |
| `npm run preview` | ビルド結果をプレビュー |

### エディタ設定
- VSCode / Cursor に **Astro拡張機能** を導入
  - `.astro` ファイルのシンタックスハイライト、補完、フォーマットが有効になる

### 学んだこと
- `.astro` ファイルは `---`（フェンス）で囲んだ上部がJavaScript、下部がHTMLテンプレート
- `---` 内のJSはデフォルトで **SSG（Static Site Generation）** としてビルド時に実行される
  - 結果は静的HTMLとして `dist/` に出力され、ブラウザにはJSが送られない（= 高速）
  - `npm run dev` 中はリクエストごとに再実行されるが、`npm run build` では実行時点で固定される
  - SSR（Server Side Rendering）モードに切り替えれば、リクエストごとにサーバーで実行することも可能
- `src/pages/` 内のファイルが自動的にルーティングされる（ファイルベースルーティング）
- `public/` は静的ファイル置き場、`src/assets/` はビルド時に最適化されるアセット置き場

## Hello World (2026-02-17)

### やったこと
1. `index.astro` をシンプルなHello Worldに書き換え
2. フロントマター（`---`）内でJS変数を定義し、テンプレートで `{変数名}` で埋め込み

### 学んだこと
- `---` 内 = サーバー側JS、テンプレート部分 = HTML
- `{変数名}` でJSの値をHTMLに埋め込める（JSX風の記法）
- ブラウザに届くのは純粋なHTML（JSゼロ）

## ページ追加とルーティング (2026-02-17)

### やったこと
1. `src/pages/about.astro` を新規作成 → `/about` でアクセス可能に
2. `index.astro` に Aboutへのリンクを追加、Aboutにトップへのリンクを追加

### 学んだこと
- **ファイルベースルーティング**: ファイルパスがそのままURLになる
  - `src/pages/index.astro` → `/`
  - `src/pages/about.astro` → `/about`
  - `src/pages/blog/post1.astro` → `/blog/post1`
- ルーティング設定は不要。ファイルを置くだけでページが増える
- ページ間リンクは通常の `<a href="/about">` でOK

## コンポーネント (2026-02-17)

### やったこと
1. `src/components/Nav.astro` を作成（ナビゲーションの共通パーツ）
2. `index.astro` と `about.astro` から `Nav` コンポーネントを読み込んで使用

### 学んだこと
- コンポーネントは `src/components/` に置く（慣習）
- フロントマターで `import Nav from '../components/Nav.astro'` して、テンプレートで `<Nav />` と使う
- 共通パーツを1ファイルにまとめることで、変更が1箇所で全ページに反映される（DRY原則）

## レイアウトとProps (2026-02-17)

### やったこと
1. `src/layouts/Layout.astro` を書き換え、全ページ共通の `<html>`, `<head>`, `<Nav />` をまとめた
2. `index.astro` と `about.astro` をレイアウトで包むようにリファクタ
3. Props に `interface Props` で型定義を追加

### 学んだこと
- **レイアウト**: `src/layouts/` に共通の枠組みを定義。ページは中身だけ書けばよくなる
- **Props**: 親から子にデータを渡す仕組み
  - 親: `<Layout title="Hello Astro!">` で値を渡す
  - 子: `const { title } = Astro.props;` で受け取る
- **`<slot />`**: レイアウト内の差し込み口。各ページの中身がここに入る
- **型定義**: フロントマター内に `interface Props` を定義すると `Astro.props` に型が付く
  ```astro
  ---
  interface Props {
    title: string;
  }
  const { title } = Astro.props;
  ---
  ```
  - 渡し忘れや型違いをエディタが警告してくれる

## スタイリング (2026-02-17)

### やったこと
1. `Nav.astro` にスタイルを追加（黒背景・白文字のナビバー）
2. `Layout.astro` に全体のベーススタイルを追加（余白、フォント）

### 学んだこと
- `.astro` ファイル内の `<style>` は**デフォルトでスコープ付き**（そのコンポーネント内だけに適用）
  - Nav内で `a { color: #fff; }` としても、他のページの `<a>` には影響しない
  - Astroが `data-astro-cid-xxxx` 属性を自動付与してスコープを実現している
- グローバルに適用したい場合は `<style is:global>` を使う

## 動的ルーティングとContent Collections (2026-02-17)

### やったこと
1. `src/content.config.ts` でブログコレクションを定義（スキーマ: title, date）
2. `src/content/blog/` にMarkdown記事を2つ作成
3. `src/pages/blog/index.astro` でブログ一覧ページを作成
4. `src/pages/blog/[id].astro` で動的ルーティングによる個別記事ページを作成
5. ナビにブログリンクを追加

### Content Collections
- `src/content/blog/` にMarkdownファイルを置いて記事を管理
- `src/content.config.ts` でスキーマを定義 → zodで型安全にバリデーション
  ```ts
  const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      date: z.string(),
    }),
  });
  ```
- `getCollection('blog')` で全記事を型付きで取得できる

### 動的ルーティング
- `[id].astro` のようにファイル名を `[]` で囲むと動的パラメータになる
- SSGでは `getStaticPaths()` で全パスを事前に列挙する必要がある
  ```ts
  export async function getStaticPaths() {
    const posts = await getCollection('blog');
    return posts.map((post) => ({
      params: { id: post.id },
      props: { post },
    }));
  }
  ```
- Markdownファイルを追加するだけで新しいページが自動生成される

### getCollection() の仕組み
- `getCollection('blog')` は直接フォルダを読んでいるのではなく、`content.config.ts` が仲介役
- 流れ:
  1. `content.config.ts` で `'blog'` コレクションを定義（名前・フォルダパス・スキーマ）
  2. `npx astro sync` で設定を読み取り、`.astro/` に型定義とデータ参照情報を生成
  3. `getCollection('blog')` 呼び出し時、`'blog'` キーで設定を参照 → 紐づいたフォルダを読み取り → スキーマでバリデーションして返す
- この仕組みにより、型安全なデータ取得とバリデーションが実現できている

### getStaticPaths() の役割
- `[id].astro` のような動的ルーティングで **Astroがビルド時に自動で呼び出す** 特別な関数
- SSGでは全ページを事前に生成する必要があるため、「どのページを作るか」のリストを返す
  ```ts
  return posts.map((post) => ({
    params: { id: post.id },  // URLの [id] 部分
    props: { post },          // そのページで使うデータ
  }));
  ```
- 返したリストの数だけHTMLが生成される（記事2つ → 2ページ）
- SSRモードでは不要（リクエスト時に動的に生成するため）

### 型定義の生成
- Content Collectionsの追加・変更後は `npx astro sync` を実行する
- `.astro/` ディレクトリに型定義が自動生成され、`getCollection()` の戻り値などに型が付く
- 設定変更後はdevサーバーの再起動も必要

## ここまでの整理: Astro Islands について (2026-02-17)

ここまでの学習は **すべて静的HTML（JSゼロ）** の世界。まだ Islands は使っていない。

- `.astro` コンポーネントは常に静的HTMLとして出力される（JSはブラウザに送られない）
- **Astro Islands** = ページの大部分は静的HTML、**インタラクティブが必要な部分だけ**にReact/Vue等のコンポーネントをJS付きで埋め込む仕組み
- React等のコンポーネントに `client:load` などのディレクティブを付けた部分が「Island」になる
- 他のフレームワーク（Next.js等）はページ全体にJSを送るが、Astroは必要な部分だけ → 高速

## SSGとSSRの共存 (2026-02-17)

- Astroは **ページ単位** でSSG/SSRを切り替えられる
  - SSRにしたいページ: `export const prerender = false;`
  - SSGに戻したいページ: `export const prerender = true;`
- 使い分けの例:
  - トップページ、ブログ → SSG（静的でOK、高速）
  - ダッシュボード、検索結果 → SSR（ユーザーごとに違う内容）

## `<script>` タグでクライアント側JS (2026-02-18)

### やったこと
1. `index.astro` にカウンターUI（ボタン + 表示）を追加
2. `<script>` タグ内でDOM操作によるカウンター機能を実装

### 学んだこと
- `<script>` タグ内のJSはブラウザで実行される（`---` 内とは別世界）
- `---` 内の変数は `<script>` から直接参照できない
- `<script>` はAstroがバンドル・最適化してくれる（TypeScriptもそのまま書ける）
- これはIslandsではなく素のJS。Islandsは React/Vue 等のフレームワークコンポーネント + `client:*` ディレクティブ

## Astro Islands 体験 (2026-02-18)

### やったこと
1. `npx astro add react` でReactインテグレーションを追加（質問はすべてYes）
2. `src/components/Counter.tsx` にReactカウンターコンポーネントを作成
3. `index.astro` に3種類のカウンターを並べて比較

### 3つのカウンター比較
| # | 種類 | 動く？ | 理由 |
|:--|:--|:--|:--|
| 1 | 素のJS（`<script>`） | 動く | ブラウザでJS実行 |
| 2 | React + `client:load` | 動く | **Island！** ReactのJSがブラウザに送られる |
| 3 | React（`client:` なし） | 動かない | HTMLだけ出力、JSは送られない |

### 学んだこと
- `npx astro add <名前>` でインテグレーション（React, Vue, Tailwind等）を追加できる
- Reactコンポーネントでも `client:*` を付けなければ静的HTMLとして出力されるだけ（JSゼロ）
- `client:*` ディレクティブを付けた部分だけが **Island** になり、JSがブラウザに送られる
- `client:` ディレクティブの種類:
  | ディレクティブ | 動作 |
  |:--|:--|
  | `client:load` | ページ読み込み時にすぐ実行 |
  | `client:idle` | ブラウザがアイドル状態になったら実行 |
  | `client:visible` | コンポーネントが画面に表示されたら実行 |

## SSR実践 (2026-02-18)

### やったこと
1. `npx astro add node` でNode.jsアダプターを追加
2. `astro.config.mjs` に `output: 'server'` を追加（デフォルトをSSRに変更）
3. `src/pages/ssr-demo.astro` を作成（SSRならではの動的ページ）
4. 既存ページに `export const prerender = true` を追加してSSGを維持

### 設定
- `output: 'server'` → デフォルトがSSR。ページ単位で `prerender = true` にするとSSG
- `output: 'static'`（デフォルト）→ 全ページSSG。ページ単位で `prerender = false` にするとSSR
- SSRにはアダプターが必要（`@astrojs/node`, `@astrojs/vercel` 等）

### SSRならではの機能
- `Astro.request` でリクエスト情報にアクセスできる
- URLパラメータの取得: `new URL(Astro.request.url).searchParams.get("name")`
- `---` 内のコードがリクエストごとに実行される（時刻やランダム値が毎回変わる）
- `getStaticPaths()` は不要（動的にページを生成するため）

### 現在のサイト構成
| ページ | モード | 理由 |
|:--|:--|:--|
| `/` | SSG (`prerender = true`) | 静的でOK |
| `/about` | SSG | 静的でOK |
| `/blog`, `/blog/[id]` | SSG | 記事は事前ビルドでOK |
| `/ssr-demo` | SSR（デフォルト） | リクエストごとに内容が変わる |

## View Transitions (2026-02-18)

### やったこと
1. `Layout.astro` に `<ClientRouter />` を1行追加

### 学んだこと
- View Transitions API自体はブラウザのネイティブAPI（Astro固有ではない）
- ただしAstroが特別なのは **MPAなのにView Transitionsを簡単に使える** 点
  - SPA（Next.js等）→ JS制御なのでアニメーションは自然にできる
  - MPA（従来）→ HTML丸ごと読み直しなのでアニメーションが難しい
  - Astro → MPAだが、裏側でページ取得→DOM差分→アニメーションを自動処理
- `<ClientRouter />` を `<head>` に追加するだけで全ページに適用される
- ※ Astro 4 では `ViewTransitions` という名前だった（5で `ClientRouter` にリネーム）
- デフォルトはフェードアニメーション
- `transition:animate="slide"` などで要素ごとにカスタマイズも可能

## APIエンドポイント (2026-02-18)

### やったこと
1. `src/pages/api/hello.ts` にGET/POST対応のAPIエンドポイントを作成
2. `src/pages/api-demo.astro` でAPIを呼び出すデモページを作成
3. ナビにAPIデモリンクを追加

### 学んだこと
- `src/pages/api/` に `.ts` ファイルを置くとAPIエンドポイントになる（ファイルベースルーティング）
  - `src/pages/api/hello.ts` → `/api/hello`
- `export const GET` / `export const POST` でHTTPメソッドごとに処理を分ける
  ```ts
  import type { APIRoute } from "astro";

  export const GET: APIRoute = ({ url }) => {
    const name = url.searchParams.get("name") || "ゲスト";
    return new Response(JSON.stringify({ message: `こんにちは、${name}さん！` }), {
      headers: { "Content-Type": "application/json" },
    });
  };
  ```
- 戻り値は Web標準の `Response` オブジェクト
- SSRモードで動作する（リクエストごとにサーバーで実行）
- クライアント側からは `fetch("/api/hello")` で呼び出す

## GraphQL + gql.tada (2026-02-18)

### やったこと
1. `npm install graphql graphql-yoga gql.tada` でインストール
2. `src/graphql/schema.ts` にGraphQLスキーマ（typeDefs + resolvers）を定義
3. `src/pages/api/graphql.ts` にGraphQLエンドポイントを作成（graphql-yoga）
4. gql.tada のセットアップ（型付きクライアント）
5. `src/pages/graphql-demo.astro` で型付きクエリのデモページを作成

### GraphQLサーバー側
- `graphql-yoga` を使ってAPIエンドポイント内にGraphQLサーバーを構築
- `src/graphql/schema.ts` で `typeDefs`（データの型）と `resolvers`（データ取得ロジック）を定義
- `/api/graphql` にアクセスするとGraphQL Playgroundが使える
- yogaのレスポンスは `new Response(response.body, ...)` でAstroのResponseに変換が必要

### gql.tada セットアップ手順
1. スキーマからSDLを生成:
   ```bash
   npx gql.tada generate-schema http://localhost:4321/api/graphql --output src/graphql/introspection.ts
   ```
2. `tsconfig.json` にプラグイン設定を追加:
   ```json
   "plugins": [{
     "name": "gql.tada/ts-plugin",
     "schema": "./src/graphql/introspection.ts",
     "tadaOutputLocation": "./src/graphql/graphql-env.d.ts"
   }]
   ```
3. 型定義ファイルを生成:
   ```bash
   npx gql.tada generate-output --tsconfig tsconfig.json
   ```
4. Cursor/VSCode で「TypeScript: Select TypeScript Version」→「Use Workspace Version」を選択

### gql.tada の仕組み
- `generate-output` で `graphql-env.d.ts` が生成される（スキーマのintrospection型情報）
- `graphql-env.d.ts` 内の `declare module 'gql.tada'` で型情報が自動適用される
- `graphql()` でクエリを書くと、スキーマと照合して戻り値の型が自動推論される
- `executeGraphQL()` ヘルパーで `TadaDocumentNode` の型を `Result` として伝播させる

### スキーマ変更時の型の再生成
- `schema.ts` を変更したら `generate-schema` → `generate-output` の2コマンドを再実行する必要がある
- これを自動化するため `chokidar-cli` + `concurrently` を導入:
  ```bash
  npm install -D chokidar-cli concurrently
  ```
- 追加したスクリプト:
  | コマンド | 説明 |
  |:--|:--|
  | `npm run codegen` | 手動で型を再生成 |
  | `npm run codegen:watch` | `schema.ts` を監視して自動で型を再生成 |
  | `npm run dev:all` | devサーバー + codegen watch を同時起動 |
- 今後は `npm run dev:all` で起動すれば、`schema.ts` を編集するだけで自動的に型が更新される

### 注意点
- `graphql()` で生成された DocumentNode は `toString()` ではなく `print()`（graphqlパッケージ）でクエリ文字列に変換する

## デバッグ環境 (2026-02-18)

### やったこと
1. `.vscode/launch.json` にデバッグ構成を追加
2. ブレークポイントによるデバッグが `.astro` の `---` 内、`.ts` ファイルで動作確認済み

### デバッグ構成
- **Astro Dev (デバッグ)**: devサーバーのみ起動（ブレークポイント有効）
- **Astro Dev + Codegen Watch (デバッグ)**: devサーバー + codegen watch を同時起動（ブレークポイント有効）

### 使い方
1. Cursor サイドバー → 「実行とデバッグ」（虫アイコン）
2. ドロップダウンから構成を選択して ▶ で起動
3. コード内の行番号左をクリックしてブレークポイントを設置
4. ブラウザでアクセスするとブレークポイントで停止する

### ブレークポイントが効く場所
- `.astro` ファイルの `---` 内（サーバー側コード）
- `.ts` ファイル（`schema.ts`, `api/graphql.ts` 等）
- テンプレート部分（HTML）には効かない

## フォーマッター (2026-02-18)

### やったこと
1. `npm install -D prettier prettier-plugin-astro` でインストール
2. `.prettierrc` にPrettier設定を作成（astroプラグイン有効化）
3. `.vscode/settings.json` に保存時自動整形を設定

### 設定内容
- `.astro` ファイル → Astro拡張のフォーマッター（内部でPrettier + astroプラグイン使用）
- `.ts`, `.tsx` ファイル → Prettier
- ファイル保存時に自動で整形される（`editor.formatOnSave: true`）

### なぜBiomeではなくPrettierか
- Biomeは高速だが `.astro` ファイル未対応
- Prettierには公式の `prettier-plugin-astro` があり安定している

## 環境変数 (2026-02-18)

### やったこと
1. `.env` を作成し `SITE_URL` を定義
2. `client.ts` のベタ書き `http://localhost:4321` を `import.meta.env.SITE_URL` に置き換え

### Astroの環境変数の仕組み
- `.env` ファイルに定義し、`import.meta.env.変数名` で参照する
- プレフィックスによってアクセス範囲が変わる:
  | プレフィックス | アクセスできる場所 |
  |:--|:--|
  | `PUBLIC_` なし | サーバー側のみ（`---` 内, `.ts` ファイル） |
  | `PUBLIC_` 付き | サーバー側 + クライアント側（ブラウザ） |
- 本番デプロイ時は `.env` の値を本番URLに変えるだけでOK

### ファイル構成
```
src/graphql/
├── schema.ts          ... GraphQLスキーマ定義（サーバー側）
├── client.ts          ... graphql() と executeGraphQL()（クライアント側）
├── introspection.ts   ... スキーマSDL（generate-schemaで生成）
└── graphql-env.d.ts   ... 型情報（generate-outputで生成）
```

## ミドルウェア (2026-02-19)

### やったこと
1. `src/middleware.ts` を作成しリクエストのロギングを実装
2. `src/env.d.ts` で `App.Locals` の型定義を追加
3. `locals` でミドルウェアからページへデータを渡す仕組みを実装（`/middleware-demo`）
4. `/protected` へのアクセス制御（Cookie認証）を実装
5. `/login` と `/api/login`, `/api/logout` を作成

### 学んだこと

#### ミドルウェアの基本構造
- `src/middleware.ts` に `onRequest` をエクスポートするだけで有効になる
- `next()` を呼ぶと次の処理（ページ・APIルート）に進む
- `next()` の前後に処理を挟める（リクエスト前・レスポンス後）

```ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // リクエスト前の処理

  const response = await next();

  // レスポンス後の処理
  return response;
});
```

#### locals でページにデータを渡す
- `context.locals.xxx` でセット → `Astro.locals.xxx` でページから読み取れる
- 型は `src/env.d.ts` の `App.Locals` インターフェースで宣言する

```ts
// env.d.ts
declare namespace App {
  interface Locals {
    requestId: string;
    visitedAt: string;
  }
}
```

```ts
// middleware.ts
context.locals.requestId = crypto.randomUUID();
```

```astro
---
// ページ側
const { requestId } = Astro.locals;
---
```

#### アクセス制御（リダイレクト）
- `next()` を呼ばずに `return context.redirect("/login")` するとページをスキップできる

```ts
const PROTECTED_PATHS = ["/protected"];

if (PROTECTED_PATHS.includes(pathname)) {
  const cookie = context.request.headers.get("cookie") ?? "";
  if (!cookie.includes("auth=true")) {
    return context.redirect("/login"); // ページの処理をスキップ
  }
}
```

#### リダイレクトのフロー

**ログインしていない場合（リダイレクト発生）**
```
ブラウザ → GET /protected
               ↓
         middleware.ts
           1. pathname = "/protected"
           2. PROTECTED_PATHS に含まれる？ → YES
           3. Cookie に auth=true がある？ → NO
           4. context.redirect("/login") を return
              ↑ next() は呼ばれない = protected.astro は実行されない
               ↓
         302 レスポンス（Location: /login）がブラウザへ返る
               ↓
         ブラウザが自動で GET /login を送信
               ↓
         middleware.ts（再度実行）
           1. pathname = "/login"
           2. PROTECTED_PATHS に含まれる？ → NO
           3. next() を呼ぶ
               ↓
         login.astro が実行 → HTMLをレスポンス
               ↓
         ブラウザがログインページを表示
```

**ログインする場合**
```
ブラウザ → POST /api/login（ボタンを押したとき）
               ↓
         middleware.ts
           pathname = "/api/login" → 保護対象外
           next() を呼ぶ
               ↓
         api/login.ts が実行
           302 レスポンスを返す
           Set-Cookie: auth=true; HttpOnly
               ↓
         ブラウザが Cookie を保存 + 自動で GET /protected を送信
               ↓
         middleware.ts
           1. pathname = "/protected"
           2. Cookie に auth=true がある？ → YES（今度はある）
           3. next() を呼ぶ
               ↓
         protected.astro が実行 → HTMLをレスポンス
               ↓
         ブラウザが保護ページを表示
```

**ログアウトする場合**
```
ブラウザ → POST /api/logout（ボタンを押したとき）
               ↓
         api/logout.ts が実行
           Set-Cookie: auth=true; Max-Age=0  ← Max-Age=0 で即削除
           302 レスポンス（Location: /login）
               ↓
         ブラウザが Cookie を削除 + 自動で GET /login を送信
               ↓
         login.astro が表示される
```

#### 重要なポイント
- ミドルウェアは**サーバーで実行**される（`console.log` はターミナルに出力される）
- `prerender = true` のSSGページにはミドルウェアは**実行されない**
- `next()` を呼ばずに `return` するとページの処理をスキップできる
- `HttpOnly` を Cookie に付けると JS（`document.cookie`）から読めなくなり、XSS攻撃でCookieが盗まれにくくなる

---

## 画像最適化 (2026-02-19)

### やったこと
1. `src/assets/sample.jpg` にサンプル画像を追加
2. `/image-demo` ページで各機能を比較デモ
3. `astro.config.mjs` にリモート画像の許可ドメインを設定

### `src/assets/` vs `public/` の違い

| | `src/assets/` | `public/` |
|---|---|---|
| 処理 | Astroがビルド時に最適化 | そのままコピーされる |
| `<Image />` | 使える（import して渡す） | 使えない（パス文字列のみ） |
| 用途 | ページで使う画像 | favicon、OGP画像など |

### 学んだこと

#### `<Image />` コンポーネントが自動でやること
- **WebP変換** — JPG/PNGを自動でWebPに変換（ファイルサイズ削減）
- **リサイズ** — 指定したサイズに最適化
- **`loading="lazy"`** — 遅延読み込みを自動付与
- **`width`/`height`** — CLS（レイアウトずれ）防止のため自動付与

```astro
---
import { Image } from "astro:assets";
import sampleImage from "../assets/sample.jpg";
---

<Image src={sampleImage} width={400} alt="説明文" />
```

#### `quality` オプション
```astro
<Image src={image} width={300} quality={10} alt="低画質・軽量" />
<Image src={image} width={300} quality={90} alt="高画質・重め" />
```
- 数値は `1〜100`。デフォルトは `80`
- 低いほどファイルサイズが小さくなる

#### `format` オプション
```astro
<Image src={image} width={300} format="avif" alt="AVIF形式" />
```

| フォーマット | 特徴 |
|---|---|
| `webp` | 広くサポート、デフォルト |
| `avif` | より高圧縮、新しいブラウザのみ |
| `jpeg` / `png` | 従来形式 |

#### `<Picture />` コンポーネント
複数フォーマットを並べて提供し、ブラウザが対応しているものを自動選択する。

```astro
---
import { Picture } from "astro:assets";
---

<Picture src={image} formats={["avif", "webp"]} alt="..." />
```

生成されるHTML：
```html
<picture>
  <source type="image/avif" srcset="...avif" />
  <source type="image/webp" srcset="...webp" />
  <img src="...webp" ... />  <!-- フォールバック -->
</picture>
```

#### リモート画像
外部URLの画像も最適化できる。`height` の指定が必須（Astroがサイズを自動取得できないため）。

```astro
<Image
  src="https://example.com/photo.jpg"
  width={400}
  height={267}
  alt="リモート画像"
/>
```

許可ドメインを `astro.config.mjs` に設定する必要がある（セキュリティのため）：

```js
// astro.config.mjs
export default defineConfig({
  image: {
    domains: ["example.com"],
  },
});
```

---

## 次のステップ
- [x] 画像最適化: `<Image />` で自動リサイズ・WebP変換
- [ ] 認証: セッション・Cookie の本格的な管理
- [ ] データベース連携: Prisma / Drizzle
- [ ] デプロイ: 実際にサイトを公開する
