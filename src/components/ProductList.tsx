import { useStore } from "@nanostores/react";
import { cartItems, addToCart } from "../stores/cartStore";

const PRODUCTS = [
  { name: "Astro本", price: 3000 },
  { name: "TypeScriptステッカー", price: 500 },
  { name: "メカニカルキーボード", price: 15000 },
];

export default function ProductList() {
  // cartItems が更新されると自動で再レンダリングされる
  const items = useStore(cartItems);

  return (
    <div>
      <h3>商品一覧</h3>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.name} style={{ marginBottom: "0.5rem" }}>
            {product.name}（¥{product.price.toLocaleString()}）
            <button
              onClick={() => addToCart(product)}
              style={{ marginLeft: "1rem" }}
            >
              カートに追加
            </button>
            {items[product.name] && (
              <span style={{ marginLeft: "0.5rem", color: "green" }}>
                × {items[product.name].quantity}
              </span>
            )}
          </li>
        ))}
      </ul>

      <h3>カートの中身</h3>
      {Object.keys(items).length === 0 ? (
        <p>カートは空です</p>
      ) : (
        <ul>
          {Object.values(items).map((item) => (
            <li key={item.name}>
              {item.name} × {item.quantity} = ¥
              {(item.price * item.quantity).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
