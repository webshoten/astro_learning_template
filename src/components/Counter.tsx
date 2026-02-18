import { useState } from "react";

// Reactコンポーネント: stateを持つインタラクティブなUI
// これが Astro Island としてブラウザにJSが送られる
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span style={{ fontSize: "1.5rem", minWidth: "2rem", textAlign: "center" }}>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
