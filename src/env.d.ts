/// <reference types="astro/client" />

// Astro.locals の型定義
// ミドルウェアでセットしたデータの型をここで宣言する
declare namespace App {
  interface Locals {
    requestId: string;
    visitedAt: string;
  }
}
