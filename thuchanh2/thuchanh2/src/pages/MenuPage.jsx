import React, { useState } from "react";
import "./menupage.css";
import Cart from "../component/designs/Cart";
import OrderForm from "../component/designs/OrderForm";

const MenuPage = () => {
  const [menuItems] = useState([
    { id: 1, name: "Cà phê đen đá", price: 30000, img: "/assets/coffee2.jpg" },
    { id: 2, name: "Cà phê sữa đá", price: 35000, img: "/assets/coffee2.jpg" },
    { id: 3, name: "Bạc xỉu", price: 40000, img: "/assets/coffee2.jpg" },
    { id: 4, name: "Latte", price: 45000, img: "/assets/coffee2.jpg" },
    { id: 5, name: "Trà đào cam sả", price: 40000, img: "/assets/coffee2.jpg" },
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
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

  const openOrderForm = () => {
    setShowOrderForm(true);
  };

  return (
    <div className="menu-wrapper">
      <h1>Menu đồ uống</h1>

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString()}đ</p>
            <button className="add-btn" onClick={() => addToCart(item)}>
              Thêm vào giỏ
            </button>
          </div>
        ))}
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
