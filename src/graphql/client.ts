// gql.tada から直接 graphql を使う
// graphql-env.d.ts の declare module で型情報が自動的に適用される
import { graphql } from "gql.tada";
import type { TadaDocumentNode } from "gql.tada";
import { print } from "graphql";

export { graphql };

// 型付きのGraphQL実行関数
// print() で DocumentNode をクエリ文字列に変換する
// import.meta.env.SITE_URL で .env のベースURLを参照する
export async function executeGraphQL<Result, Variables>(
  query: TadaDocumentNode<Result, Variables>,
  variables?: Variables,
): Promise<Result> {
  const res = await fetch(`${import.meta.env.SITE_URL}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(query),
      variables: variables ?? undefined,
    }),
  });
  const json = await res.json();
  return json.data as Result;
}
