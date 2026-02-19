import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  contact: defineAction({
    // accept: "form" にすると HTML フォームからの送信を受け付ける
    accept: "form",

    // input: zod でバリデーションルールを定義
    // バリデーション失敗時は自動でエラーが返る（自分でチェック不要）
    input: z.object({
      name: z.string().min(1, "名前を入力してください"),
      email: z.string().email("正しいメールアドレスを入力してください"),
      message: z.string().min(10, "メッセージは10文字以上で入力してください"),
    }),

    // handler: バリデーション通過後に実行される処理
    // input には型付きの値が入ってくる
    handler: async (input) => {
      // 本来はここでメール送信やDB保存を行う
      console.log("お問い合わせ受信:", input);

      // 返した値は Astro.getActionResult() で受け取れる
      return {
        name: input.name,
      };
    },
  }),
};
