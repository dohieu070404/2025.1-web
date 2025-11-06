import React from "react";
import "./contactpage.css";

const ContactPage = () => {
  return (
    <div className="contact-wrapper">
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Liên hệ với Hiếu Coffee</h1>
          <p>
            Chúng tôi luôn sẵn sàng lắng nghe bạn. 
            Hãy ghé thăm hoặc gửi lời nhắn cho chúng tôi nhé.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Thông tin liên hệ</h2>
            <p><strong>Địa chỉ:</strong> 123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
            <p><strong>Điện thoại:</strong> 0123 456 789</p>
            <p><strong>Email:</strong> hieucoffee@gmail.com</p>
            <p><strong>Giờ mở cửa:</strong> 7:00 – 22:00 mỗi ngày</p>
          </div>

          <div className="contact-form">
            <h2>Gửi lời nhắn cho chúng tôi</h2>
            <form>
              <input type="text" placeholder="Họ và tên" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Lời nhắn của bạn..." rows="5" required></textarea>
              <button type="submit">Gửi tin nhắn</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
