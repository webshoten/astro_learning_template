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

---

## 次のステップ
- [ ] スタイリング: `.astro` ファイル内のスコープ付き `<style>` を学ぶ
