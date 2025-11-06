import React from "react";
import "./cart.css";

const Cart = ({ cart, updateQuantity, removeItem, openOrderForm }) => {
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Tên món</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()}đ</td>
                  <td>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Tổng cộng: {total.toLocaleString()}đ</h3>
          <button className="order-btn" onClick={openOrderForm}>
            Đặt hàng
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
