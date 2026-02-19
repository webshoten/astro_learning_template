import { useStore } from "@nanostores/react";
import { cartCount } from "../stores/cartStore";

// useStore: ストアの値を読み取り、変化があると自動で再レンダリングする
export default function CartCount() {
  const count = useStore(cartCount);

  return (
    <span>
      🛒 {count}
    </span>
  );
}
