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

---

## 次のステップ
- [ ] コンポーネント: 共通パーツを分離して再利用する
- [ ] レイアウト: 全ページ共通の `<html>`, `<head>` をまとめる
