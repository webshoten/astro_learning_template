import { atom, map } from "nanostores";

// atom: プリミティブな値（数値・文字列・真偽値）を管理する
export const cartCount = atom(0);

// map: オブジェクトを管理する（キーごとに更新できる）
export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export const cartItems = map<Record<string, CartItem>>({});

// カートに商品を追加するロジック
export function addToCart(item: Omit<CartItem, "quantity">) {
  const current = cartItems.get();

  if (current[item.name]) {
    // すでにある場合は数量を増やす
    cartItems.setKey(item.name, {
      ...current[item.name],
      quantity: current[item.name].quantity + 1,
    });
  } else {
    // 新規追加
    cartItems.setKey(item.name, { ...item, quantity: 1 });
  }

  // 合計数を更新
  cartCount.set(cartCount.get() + 1);
}
