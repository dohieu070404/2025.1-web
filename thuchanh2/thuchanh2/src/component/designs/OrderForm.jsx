import React, { useState } from "react";
import "./orderform.css";

const OrderForm = ({ cart, onClose, setCart }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    note: "",
    payment: "cash",
    type: "here",
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Đặt hàng thành công!\nKhách hàng: ${form.name}\nTổng: ${total.toLocaleString()}đ`
    );
    setCart([]);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="order-popup">
        <h2>Đặt hàng</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="note"
            placeholder="Ghi chú (nếu có)"
            value={form.note}
            onChange={handleChange}
          />

          <div className="option-group">
            <label>Hình thức thanh toán:</label>
            <select name="payment" value={form.payment} onChange={handleChange}>
              <option value="cash">Tiền mặt</option>
              <option value="bank">Chuyển khoản</option>
            </select>
          </div>

          <div className="option-group">
            <label>Cách dùng:</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="here">Dùng tại quán</option>
              <option value="takeaway">Mang đi</option>
            </select>
          </div>

          <div className="summary">
            <h3>Tổng: {total.toLocaleString()}đ</h3>
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">Xác nhận đặt</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
