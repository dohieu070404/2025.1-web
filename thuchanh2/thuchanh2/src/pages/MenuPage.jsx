import React, { useEffect, useState } from "react";
import "./menupage.css";
import Cart from "../component/designs/Cart";
import OrderForm from "../component/designs/OrderForm";
import { subscribeMenuChanges } from "../shared/menuBus";

const LS_MENU_KEY = "admin.menu";

const readMenu = () => {
  try {
    const raw = localStorage.getItem(LS_MENU_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

const formatVND = (n) => (Number(n) || 0).toLocaleString() + "đ";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState(() => readMenu());
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Lần đầu: nếu localStorage rỗng thì fallback sang file tĩnh
  useEffect(() => {
    if (menuItems.length === 0) {
      fetch("/data/menu.json")
        .then((r) => (r.ok ? r.json() : []))
        .then((arr) => {
          if (Array.isArray(arr) && arr.length) setMenuItems(arr);
        })
        .catch(() => {});
    }
  }, []); 

  useEffect(() => {
    const unsub = subscribeMenuChanges(() => {
      setMenuItems(readMenu());
    });
    return unsub;
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
     
      const img = item.image || item.img || "";
      return [...prev, { ...item, img, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const openOrderForm = () => setShowOrderForm(true);

  return (
    <div className="menu-wrapper">
      <h1>Menu đồ uống</h1>

      <div className="menu-grid">
        {menuItems.map((item) => {
          const img = item.image || item.img || "";
          return (
            <div className="menu-card" key={item.id}>
              <img src={img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{formatVND(item.price)}</p>
              <button className="add-btn" onClick={() => addToCart(item)}>
                Thêm vào giỏ
              </button>
            </div>
          );
        })}
        {menuItems.length === 0 && <p>Đang tải menu…</p>}
      </div>

      <div className="cart-toggle">
        <button onClick={() => setShowCart(!showCart)}>
          {showCart ? "Ẩn giỏ hàng" : `Xem giỏ hàng (${cart.length})`}
        </button>
      </div>

      {showCart && (
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          openOrderForm={openOrderForm}
        />
      )}

      {showOrderForm && (
        <OrderForm
          cart={cart}
          onClose={() => setShowOrderForm(false)}
          setCart={setCart}
        />
      )}
    </div>
  );
};

export default MenuPage;
