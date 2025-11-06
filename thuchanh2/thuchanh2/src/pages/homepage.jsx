import React from "react";
import "./homepage.css";
import ScrollToTop from "../component/designs/ScrollToTop";
import Slideshow from "../component/designs/Slideshow";
import CardGrid from "../component/designs/CardGrid";

const images = [
  "/assets/coffee1.jpg",
  "/assets/coffee2.jpg",
  "/assets/coffee3.jpg",
  "/assets/coffee4.jpg",
];

const cards = [
  {
    title: "Cà phê rang xay nguyên chất",
    description: "Hương vị đậm đà, được chọn lọc từ những hạt cà phê tốt nhất của vùng Tây Nguyên.",
    tags: ["Cà phê truyền thống"],
    bgImg: "/assets/coffee1.jpg",
  },
  {
    title: "Không gian chill & ấm cúng",
    description: "Thưởng thức tách cà phê trong không gian mộc mạc, yên bình và tràn ngập hương thơm.",
    tags: ["Không gian"],
    bgImg: "/assets/coffee2.jpg",
  },
  {
    title: "Menu đa dạng",
    description: "Từ Espresso, Latte đến Cold Brew — mọi hương vị đều được pha chế tỉ mỉ.",
    tags: ["Đồ uống"],
    bgImg: "/assets/coffee3.jpg",
  },
];

const HomePage = () => {
  return (
    <>
      <div className="homepage">
      
        <section className="hero-section">
          <Slideshow slides={images} />
          <div className="hero-overlay">
            <h1 className="hero-title">Chào mừng đến với The Coff</h1>
            <p className="hero-subtitle">
              Nơi hương vị cà phê gặp gỡ cảm xúc — cùng bạn khởi đầu một ngày tràn đầy năng lượng ☕
            </p>
            <a href="#menu" className="hero-btn">Khám phá Menu</a>
          </div>
        </section>

        <section className="intro-section">
          <div className="intro-container">
            <h2>Về The Coff</h2>
            <p>
              The Coff là quán cà phê mang phong cách mộc mạc, kết hợp giữa hương vị truyền thống và không gian hiện đại. 
              Chúng tôi tin rằng, một tách cà phê ngon không chỉ là thức uống — mà là một khoảnh khắc để tận hưởng cuộc sống.
            </p>
          </div>
        </section>

        <section id="menu" className="menu-section">
          <CardGrid title="Menu nổi bật" cards={cards} />
        </section>

        <section className="contact-invite">
          <h3>Hãy đến và cảm nhận!</h3>
          <p>
            Ghé thăm The Coff để thưởng thức những hạt cà phê rang xay nguyên chất và không gian yên bình giữa lòng thành phố.
          </p>
          <a href="/contact" className="visit-btn">Liên hệ ngay</a>
        </section>
      </div>

      <ScrollToTop />

    </>
  );
};

export default HomePage;
