import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 'blog' コレクションの定義
// getCollection('blog') はこの定義を参照してデータを取得する
const blog = defineCollection({
  // src/content/blog/ 内の .md ファイルを読み込む
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  // Markdownのfrontmatter（---内）のバリデーション
  // ここで定義した型が getCollection() の戻り値に反映される
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

// 'blog' という名前で登録。この名前が getCollection('blog') のキーになる
export const collections = { blog };
